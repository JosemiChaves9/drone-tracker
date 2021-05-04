import Express from 'express';
import { DbService } from './dbServices';
import dotenv from 'dotenv';
import NodeGeocoder from 'node-geocoder';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as EmailValidator from 'email-validator';
dotenv.config();

const app = Express();

app.use(
  cors({
    origin: process.env.CLIENT_ADDRESS,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(Express.json());

const PORT = process.env.PORT || 4000;
DbService.connect().then(
  () => {
    app.listen(PORT, () =>
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
    );
  },
  () => {
    throw new Error(`can't connect to DB`);
  }
);
const geocoder = NodeGeocoder({ provider: 'openstreetmap' });

app.get('/drones', function (req, res) {
  jwt.verify(
    req.headers.usertoken as string,
    process.env.SECRET as string,
    function (err) {
      if (!err) {
        DbService.getDrones().then((rows) => {
          Promise.all(
            rows.map(async (drone) => {
              const address = await geocoder.reverse({
                lat: drone.to_lat,
                lon: drone.to_lon,
              });
              return {
                ...drone,
                address: address[0].formattedAddress,
              };
            })
          ).then((result) => res.send(result));
        });
      } else {
        res.status(401);
        res.send(err);
      }
    }
  );
});

app.get('/bases', function (req, res) {
  jwt.verify(
    req.headers.usertoken as string,
    process.env.SECRET as string,
    function (err) {
      if (!err) {
        DbService.getBases().then((rows) => res.send(rows));
      } else {
        res.status(401);
        res.send(err);
      }
    }
  );
});

app.post('/newUser', async function (req, res) {
  const { email } = req.body;
  try {
    if (EmailValidator.validate(email)) {
      const encryptedPassword = bcrypt.hashSync(req.body.password, 10);
      const usertoken = jwt.sign({ email }, process.env.SECRET as string, {
        expiresIn: '1h',
      });
      await DbService.createNewUser(
        req.body.firstName,
        req.body.lastName,
        email,
        encryptedPassword,
        usertoken
      ).then((response) => {
        res.status(201);
        const user = response[0];
        res.send({ ...user, ok: true, tokenExpirationTime: '1h' });
      });
    } else {
      res.status(400);
      res.send({
        ok: false,
        err: 'Email not valid',
      });
    }
  } catch (error) {
    res.send({ err: error.detail, ok: false });
  }
});

app.get('/user/email/:email', async (req, res) => {
  const user = await DbService.getUserByEmail(req.params.email);
  res.send(user);
});

app.get('/user/token/', async (req, res) => {
  const user = await DbService.getUserByusertoken(req.headers.usertoken);
  res.send(user);
});

app.put('/login', async (req, res) => {
  const { email } = req.body;
  const user = await DbService.getUserByEmail(email);

  if (user.err) {
    res.send({ ok: false, err: user.err });
  }

  const isEqual = bcrypt.compareSync(req.body.password, user.password);

  if (isEqual) {
    const usertoken = jwt.sign({ email }, process.env.SECRET as string, {
      expiresIn: '1h',
    });
    await DbService.updateToken(user.email, usertoken).then((user) =>
      res.send({ ok: true, ...user })
    );
  } else {
    res.send({ ok: false, err: 'The password is incorrect' });
  }
});

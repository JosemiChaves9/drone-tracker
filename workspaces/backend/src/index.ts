import Express from 'express';
import { DbService } from './DbService';
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
        DbService.getDrones().then((drones) => {
          Promise.all(
            drones.map(async (drone) => {
              const address = await geocoder.reverse({
                lat: drone.to_lat,
                lon: drone.to_lon,
              });
              return {
                ...drone,
                address: address[0].formattedAddress,
              };
            })
          ).then((droneList) => res.send(droneList));
        });
      } else {
        res.status(401);
        res.send({
          ok: false,
          err: err,
          errorMessage: 'Something went wrong with usertoken',
        });
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
        DbService.getBases().then((bases) => res.send(bases));
      } else {
        res.status(401);
        res.send({
          ok: false,
          err: err,
          errorMessage: 'Something went wrong with usertoken',
        });
      }
    }
  );
});

app.post('/user/newuser', async function (req, res) {
  const { email } = req.body;

  DbService.getUserByEmail(email).then((user) => {
    if (user.exists) {
      res.send({
        ok: false,
        err: 'User already exists',
      });
      return;
    }
  });
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
      ).then((newUser) => {
        res.status(201);
        res.send({ ...newUser, ok: true, tokenExpirationTime: '1h' });
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
  if (user.err) {
    res.status(400);
    res.send({ ok: false, err: user.err });
  }
  res.send(user);
});

app.get('/user/usertoken/:usertoken', async (req, res) => {
  const user = await DbService.getUserByusertoken(req.params.usertoken);
  if (user.err) {
    res.status(400);
    res.send({ ok: false, err: user.err });
  }
  res.send(user);
});

app.put('/user/login', async (req, res) => {
  const { email } = req.body;
  const user = await DbService.getUserByEmail(email);

  if (user.err) {
    res.status(400);
    res.send({ ok: false, err: user.err });
  }

  const isEqual = bcrypt.compareSync(req.body.password, user.password);

  if (isEqual) {
    const usertoken = jwt.sign({ email }, process.env.SECRET as string, {
      expiresIn: '1h',
    });
    await DbService.updateToken(user.email, usertoken).then((user) => {
      res.status(201);
      res.send({ ok: true, ...user });
    });
  } else {
    res.status(404);
    res.send({ ok: false, err: 'The password is incorrect' });
  }
});

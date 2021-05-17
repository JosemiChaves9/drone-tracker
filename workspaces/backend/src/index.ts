import dotenv from 'dotenv';
dotenv.config();
import Express, { NextFunction, Response, Request } from 'express';
import NodeGeocoder from 'node-geocoder';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as EmailValidator from 'email-validator';
import { DbService } from './DbService';
import type { Drone, Base, User } from '../types';

const app = Express();

app.use(
  cors({
    origin: process.env.CLIENT_ADDRESS,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(Express.json());

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  jwt.verify(
    req.headers.authorization as string,
    process.env.SECRET as string,
    (err) => {
      if (err) {
        res.status(401).send({
          ok: false,
          err: err,
          errorMessage: 'Something went wrong with authentication',
        });
      } else {
        next();
      }
    }
  );
};

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

app.get('/drones', validateToken, function (_req, res) {
  DbService.getDrones().then((drones: Drone[]) => {
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
});

app.get('/bases', validateToken, function (_req, res) {
  DbService.getBases().then((bases: Base[]) => res.send(bases));
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
    res.status(404);
    res.send({ ok: false, err: user.err });
  }
  res.send(user);
});

app.get('/user/usertoken/:usertoken', async (req, res) => {
  const user = await DbService.getUserByusertoken(req.params.usertoken);
  if (user.err) {
    res.status(404);
    res.send({ ok: false, err: user.err });
  }
  res.send(user);
});

app.put('/user/login', async (req, res) => {
  const { email } = req.body;
  const user = await DbService.getUserByEmail(email);

  if (user.err) {
    res.status(404);
    res.send({ ok: false, err: user.err });
  }

  const isEqual = bcrypt.compareSync(req.body.password, user.password); //? If I put the type, it says the property password does not exist in type

  if (isEqual) {
    const usertoken = jwt.sign({ email }, process.env.SECRET as string, {
      expiresIn: '1h',
    });
    await DbService.updateToken(user.email, usertoken).then((user) => {
      //? Same here in email
      res.status(201);
      res.send({ ok: true, ...user });
    });
  } else {
    res.status(400);
    res.send({ ok: false, err: 'The password is incorrect' });
  }
});

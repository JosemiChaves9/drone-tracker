import dotenv from 'dotenv';
dotenv.config();
import Express, { NextFunction, Response, Request } from 'express';
import NodeGeocoder from 'node-geocoder';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as EmailValidator from 'email-validator';
import { DbService } from './DbService';
import type { Drone, Base } from '../types';
import { startWebSocket } from './webSocketServer';
import { generateRoute } from 'geo-route-generator';
const app = Express();

app.use(Express.json());

app.use(
  cors({
    origin: process.env.CLIENT_ADDRESS,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  jwt.verify(
    req.headers.authorization as string,
    process.env.SECRET as string,
    (err) => {
      if (err) {
        return res.status(401).send({
          ok: false,
          ...err,
          errorMessage: 'Something went wrong with authentication',
        });
      } else {
        next();
        return {
          ok: true,
        };
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
    startWebSocket();
  },
  () => {
    throw new Error(`can't connect to DB`);
  }
);

app.get('/drones', validateToken, function (_req, res) {
  const geocoder = NodeGeocoder({ provider: 'openstreetmap' });
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
  const { email }: { email: string } = req.body;

  DbService.getUserByEmail(email).then((user) => {
    if (user) {
      return res.send({
        ok: false,
        err: 'User already exists',
      });
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
        return res
          .status(201)
          .send({ ...newUser, ok: true, tokenExpirationTime: '1h' });
      });
    } else {
      return res.status(400).send({
        ok: false,
        err: 'Email not valid',
      });
    }
  } catch (error) {
    return res.send({ err: error.detail, ok: false });
  }
});

app.get('/user/email/:email', async (req, res) => {
  const user = await DbService.getUserByEmail(req.params.email);

  if (!user) {
    return res.status(404).send({ ok: false, err: "User doesn't exists" });
  }
  return res.send(user);
});

app.get('/user/usertoken/:usertoken', validateToken, async (req, res) => {
  const user = await DbService.getUserByusertoken(req.params.usertoken);
  if (!user) {
    return res.status(404).send({
      ok: false,
      err: "User doesn't exists",
    });
  }
  return res.send({ ...user, ok: true });
});

app.put('/user/login', async (req, res) => {
  const { email }: { email: string } = req.body;
  const user = await DbService.getUserByEmail(email);

  if (!user) {
    return res.status(404).send({ ok: false, err: "User doesn't exists" });
  }

  const isEqual = bcrypt.compareSync(req.body.password, user.password);

  if (isEqual) {
    const usertoken = jwt.sign({ email }, process.env.SECRET as string, {
      expiresIn: '1h',
    });
    await DbService.updateToken(user.email, usertoken).then((user) => {
      return res.status(201).send({ ok: true, ...user });
    });
  } else {
    return res
      .status(400)
      .send({ ok: false, err: 'The password is incorrect' });
  }
});

app.post('/moveDrone/:droneName', async (req, res) => {
  console.log(req.body);
});

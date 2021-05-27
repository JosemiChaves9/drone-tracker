import dotenv from 'dotenv';
dotenv.config();
import Express, { NextFunction, Response, Request, query } from 'express';
import cors from 'cors';
import bcrypt, { compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as EmailValidator from 'email-validator';
import { DbService } from './services/DbService';
import type { Drone, Base, Coordinates } from '../types';
import { startWebSocket } from './webSocketServer';
import opencage from 'opencage-api-client';
import { DroneService } from './services/DroneService';
import { generateRoute } from 'geo-route-generator';
import NodeGeocoder from 'node-geocoder';

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
  DbService.getDrones().then((drones: Drone[]) => {
    Promise.all(
      drones.map(async (drone) => {
        const to = await opencage
          .geocode({
            q: `${drone.to_lat}, ${drone.to_lng}`,
          })
          .then((address) => address.results[0].formatted);
        const from = await opencage
          .geocode({
            q: `${drone.from_lat}, ${drone.from_lng}`,
          })
          .then((address) => address.results[0].formatted);
        return {
          ...drone,
          to: to,
          from: from,
        };
      })
    ).then(
      (droneList) => res.send(droneList),
      (rej) => {
        res.send(rej);
      }
    );
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

app.post('/drone/newDelivery', async (req, res) => {
  const from = await opencage
    .geocode({ q: req.query.from as string })
    .then((address) => {
      return {
        lat: address.results[0].geometry.lat,
        lng: address.results[0].geometry.lng,
      };
    });

  const to = await opencage
    .geocode({ q: req.query.to as string })
    .then((address) => {
      return {
        lat: address.results[0].geometry.lat,
        lng: address.results[0].geometry.lng,
      };
    });

  const route = generateRoute(
    from as { lat: number; lng: number },
    to as { lat: number; lng: number },
    100
  );

  DbService.updateDroneAddress(
    from as Coordinates,
    to as Coordinates,
    req.query.droneName as string
  );
  DroneService.startMovement(`/${req.query.droneName}` as string, route);

  res.status(201).send({ ok: true, err: '' });
});

app.put('/test', (req, res) => {
  DbService.updateDroneAddress(
    req.body.from,
    req.body.to,
    req.body.droneName
  ).then(
    (response) => {
      return res.status(204).send('');
    },
    (rej) => {
      res.send(rej);
    }
  );
});

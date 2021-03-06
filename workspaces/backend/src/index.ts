import Express, { NextFunction, Response, Request, response } from 'express';
import cors from 'cors';
import bcrypt, { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as EmailValidator from 'email-validator';
import { DbService } from './services/DbService';
import type { Drone, Base, Address } from './services/types';
import { startWebSocket } from './webSocketServer';
import opencage from 'opencage-api-client';
import { DroneService } from './services/DroneService';
import { generateRoute } from 'geo-route-generator';
import { EnviromentVariables } from './services/EnviromentVariablesService';
export const app = Express();
const server = require('http').createServer(app);
const websocketEvents = require('debug')('websocket:events');
const serverEvents = require('debug')('server:events');
const databaseEvents = require('debug')('database:events');

app.use(Express.json());
app.use(cors());

const PORT = EnviromentVariables.getPort();
DbService.connect().then(
  () => {
    server.listen(PORT, () =>
      serverEvents(`⚡️[server]: Server is running at http://localhost:${PORT}`)
    );
    websocketEvents(
      `Starting websocket server in port ${EnviromentVariables.getPort()}`
    );
    startWebSocket(server);
  },
  () => {
    throw new Error(`can't connect to DB`);
  }
);

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  jwt.verify(
    req.headers.authorization as string,
    EnviromentVariables.getSecret(),
    (err) => {
      if (err) {
        return res.status(401).send({
          ok: false,
          errorMessage: 'Something went wrong with authentication',
        });
      } else {
        next();
      }
    }
  );
};

app.get('/drones', validateToken, function (req, res) {
  DbService.getDrones().then((drones: Drone[]) => {
    res.send(drones);
  });
});

app.get('/bases', validateToken, function (req, res) {
  DbService.getBases().then((bases: Base[]) => res.send(bases));
});

app.get('/base', function (req, res) {
  DbService.getBase(req.query.name as string).then((base) => {
    res.send(base);
  });
});

app.post(
  '/user/newuser',
  async function (
    req: {
      body: {
        email: string;
        password: string;
        firstname: string;
        lastname: string;
      };
    },
    res
  ) {
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
        const usertoken = jwt.sign({ email }, EnviromentVariables.getSecret(), {
          expiresIn: '1h',
        });
        await DbService.createNewUser(
          req.body.firstname,
          req.body.lastname,
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
  }
);

app.get(
  '/user/email/:email',
  async (
    req: {
      params: {
        email: string;
        userToken: string;
      };
    },
    res
  ) => {
    const user = await DbService.getUserByEmail(req.params.email);

    if (!user) {
      return res.status(404).send({ ok: false, err: "User doesn't exists" });
    }
    return res.send(user);
  }
);

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

app.put(
  '/user/login',
  async (
    req: {
      body: {
        email: string;
        password: string;
      };
    },
    res
  ) => {
    const { email }: { email: string } = req.body;
    const user = await DbService.getUserByEmail(email);

    if (!user) {
      return res.status(404).send({ ok: false, err: "User doesn't exists" });
    }

    const isEqual = bcrypt.compareSync(req.body.password, user.password);

    if (isEqual) {
      const usertoken = jwt.sign({ email }, EnviromentVariables.getSecret(), {
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
  }
);

app.post(
  '/drone/newDelivery',
  async (
    req: {
      query: {
        from: string;
        to: string;
        droneName: string;
      };
    },
    res
  ) => {
    debugger;
    websocketEvents(
      `recieved from ${req.query.from}, recieved to ${req.query.to}, recieved droneName ${req.query.droneName}`
    );

    const from: Address = await opencage
      .geocode({ q: req.query.from as string })
      .then((address) => {
        return {
          lat: address.results[0].geometry.lat,
          lng: address.results[0].geometry.lng,
          formatted: req.query.from as string,
        };
      });

    const to: Address = await opencage
      .geocode({ q: req.query.to as string })
      .then((address) => {
        return {
          lat: address.results[0].geometry.lat,
          lng: address.results[0].geometry.lng,
          formatted: req.query.to as string,
        };
      });

    const route = generateRoute(from, to, 1024);

    websocketEvents(`route generated ${route.length}`);

    await DbService.updateDroneAddress(
      from,
      to,
      req.query.droneName as string
    ).then(() => {
      databaseEvents(
        `Database from updated with ${from}, Database to updated with ${to}, droneName updated with ${req.query.droneName}`
      );

      DroneService.startMovement(`/${req.query.droneName}`, route);
    });

    res.status(201).send({ ok: true, err: '' });
  }
);

app.post(
  '/drone/newDrone',
  validateToken,
  async (
    req: {
      body: {
        droneName: string;
        baseName: string;
      };
    },
    res
  ) => {
    const base = await DbService.getBase(req.body.baseName);

    if (!base) {
      res.send({ ok: false, err: 'Base not found' }).status(400);
      return;
    }

    const generateRandNum = () => {
      return Math.floor(Math.random() * 100);
    };

    await DbService.newDrone(
      req.body.droneName,
      generateRandNum(),
      generateRandNum(),
      base.street,
      base.lat,
      base.lng
    ).then(
      () => {
        databaseEvents(`Addedd drone with data ${req.body.droneName},
      ${generateRandNum()},
      ${generateRandNum()},
      ${base.street},
      ${base.lat},
      ${base.lng}`);
        res.status(201).send({
          ok: true,
          err: '',
        });
      },
      () => {
        res.status(400).send({
          ok: false,
          err: 'Something went wrong',
        });
      }
    );
  }
);

app.post(
  '/base/newBase',
  async (
    req: {
      body: {
        baseName: string;
        baseStreetName: string;
        baseBuildingNumber: string;
        baseCity: string;
        baseCityPostalcode: string;
      };
    },
    res
  ) => {
    const coordinates = await opencage
      .geocode({
        q: `${req.body.baseStreetName}, ${req.body.baseCityPostalcode} ${req.body.baseCity}`,
      })
      .then((response) => {
        databaseEvents(response.results);
        return {
          lat: response.results[0].geometry.lat,
          lng: response.results[0].geometry.lng,
        };
      });

    await DbService.newBase(
      req.body.baseName,
      req.body.baseStreetName,
      req.body.baseBuildingNumber,
      req.body.baseCity,
      req.body.baseCityPostalcode,
      coordinates.lng,
      coordinates.lat
    ).then(
      () => {
        databaseEvents(`Base addedd with data ${req.body.baseName},
      ${req.body.baseStreetName},
      ${req.body.baseBuildingNumber},
      ${req.body.baseCity},
      ${req.body.baseCityPostalcode},
      ${coordinates.lng},
      ${coordinates.lat}`);
        res.status(201).send({
          ok: true,
          err: '',
        });
      },
      () => {
        res.status(400).send({
          ok: false,
          err: 'Something went wrong',
        });
      }
    );
  }
);

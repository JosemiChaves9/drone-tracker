import dotenv from 'dotenv';
dotenv.config();
const events = require('debug')('database:events');
const credentials = require('debug')('database:credentials');
import { Client } from 'pg';
import { Base, Address, Drone, User, UserWithoutPassword } from './types';
import { EnviromentVariables } from './EnviromentVariablesService';

events('Database starting');
credentials({
  user: EnviromentVariables.getPostgresUser(),
  password: EnviromentVariables.getPostgresPassword(),
  host: EnviromentVariables.getHostDb(),
  port: EnviromentVariables.getDbPort(),
  database: EnviromentVariables.getPostgresDbName(),
});

const client = new Client({
  user: EnviromentVariables.getPostgresUser(),
  password: EnviromentVariables.getPostgresPassword(),
  host: EnviromentVariables.getHostDb(),
  port: EnviromentVariables.getDbPort(),
  database: EnviromentVariables.getPostgresDbName(),
});

export class DbService {
  static connect(): Promise<void> {
    return new Promise((res, rej) => {
      client.connect((err) => {
        if (err) {
          console.error('connection error', err.stack);
          rej();
        } else {
          res();
          console.log(
            `💽[database]: Database connected in port ${client.port}`
          );
        }
      });
    });
  }

  static async getDrones() {
    const result = await client.query<Drone>('SELECT * FROM public.drones');
    return result.rows;
  }

  static async getBases() {
    const result = await client.query<Base>('SELECT * FROM public.bases');
    return result.rows;
  }

  static async getBase(baseName: string) {
    const result = await client.query<Base>(
      `SELECT * FROM public.bases WHERE name='${baseName}'`
    );
    if (result.rows.length == 0) {
      return null;
    } else {
      return result.rows[0];
    }
  }

  static async createNewUser(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    usertoken: string
  ) {
    const user = await client.query<UserWithoutPassword>(
      `INSERT INTO public.users (firstname, lastname, email, password, usertoken) values ('${firstname}', '${lastname}', '${email}', '${password}', '${usertoken}') RETURNING firstname, lastname, email, usertoken`
    );
    return user.rows[0];
  }

  static async getUserByEmail(email: string): Promise<null | User> {
    const result = await client.query<User>(
      `SELECT * FROM public.users WHERE email='${email}'`
    );
    if (result.rows.length == 0) {
      return null;
    } else {
      return { ...result.rows[0] };
    }
  }

  static async getUserByusertoken(usertoken: string) {
    const result = await client.query<UserWithoutPassword>(
      `SELECT email, firstname, lastname, usertoken FROM public.users WHERE usertoken='${usertoken}'`
    );
    if (result.rows.length == 0) {
      return null;
    } else {
      return result.rows[0];
    }
  }

  static async updateToken(email: string, usertoken: string) {
    const user = await client.query<UserWithoutPassword>(
      `UPDATE public.users SET usertoken='${usertoken}' where email='${email}' RETURNING email, firstname, lastname, usertoken`
    );
    return user.rows[0];
  }

  static async updateDroneAddress(
    from: Address,
    to: Address,
    droneName: string
  ) {
    await client.query(
      `UPDATE public.drones SET address_from='${from.formatted}', from_lat='${from.lat}', from_lng='${from.lng}', to_lat='${to.lat}', to_lng='${to.lng}', address_to='${to.formatted}' WHERE name='${droneName}'`
    );
  }

  static async newDrone(
    name: string,
    battery: number,
    speed: number,
    address_from: string,
    from_lat: number,
    from_lng: number
  ) {
    await client.query(`INSERT INTO public.drones (name, battery, speed,address_from, from_lat, from_lng ) values (
    '${name}', '${battery}', '${speed}', '${address_from}', '${from_lat}', '${from_lng}')`);
  }
}

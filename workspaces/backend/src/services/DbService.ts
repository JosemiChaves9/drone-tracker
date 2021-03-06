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
      'SELECT * FROM public.bases WHERE name= $1',
      [baseName]
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
      'INSERT INTO public.users (firstname, lastname, email, password, usertoken) values ($1, $2, $3, $4, $5) RETURNING firstname, lastname, email, usertoken',
      [firstname, lastname, email, password, usertoken]
    );
    return user.rows[0];
  }

  static async getUserByEmail(email: string): Promise<null | User> {
    const result = await client.query<User>(
      'SELECT * FROM public.users WHERE email= $1',
      [email]
    );
    if (result.rows.length == 0) {
      return null;
    } else {
      return { ...result.rows[0] };
    }
  }

  static async getUserByusertoken(usertoken: string) {
    const result = await client.query<UserWithoutPassword>(
      'SELECT email, firstname, lastname, usertoken FROM public.users WHERE usertoken= $1',
      [usertoken]
    );
    if (result.rows.length == 0) {
      return null;
    } else {
      return result.rows[0];
    }
  }

  static async updateToken(email: string, usertoken: string) {
    const user = await client.query<UserWithoutPassword>(
      `UPDATE public.users SET usertoken = $1 where email = $2 RETURNING email, firstname, lastname, usertoken`,
      [usertoken, email]
    );
    return user.rows[0];
  }

  static async updateDroneAddress(
    from: Address,
    to: Address,
    droneName: string
  ) {
    await client.query(
      'UPDATE public.drones SET address_from=$1, from_lat = $2, from_lng=  $3, to_lat = $4, to_lng = $5, address_to = $6 WHERE name = $7',
      [
        from.formatted,
        from.lat,
        from.lng,
        to.lat,
        to.lng,
        to.formatted,
        droneName,
      ]
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
    await client.query(
      'INSERT INTO public.drones (name, battery, speed,address_from, from_lat, from_lng ) values ($1, $2, $3, $4, $5, $6)',
      [name, battery, speed, address_from, from_lat, from_lng]
    );
  }

  static async newBase(
    name: string,
    street: string,
    number: string,
    city: string,
    postalcode: string,
    lng: number,
    lat: number
  ) {
    await client.query(
      `INSERT INTO public.bases (name, street, number, city, postalcode, lng, lat) values ($1, $2, $3, $4, $5, $6, $7)`,
      [name, street, number, city, postalcode, lng, lat]
    );
  }
}

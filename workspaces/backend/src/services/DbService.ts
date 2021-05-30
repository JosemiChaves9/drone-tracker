import { Client } from 'pg';
import { Base, Address, Drone, User, UserWithoutPassword } from '../../types';
import { EnviromentVariables } from './EnviromentVariablesService';

const client = new Client({
  user: EnviromentVariables.getPostgresUser(),
  password: EnviromentVariables.getPostgresPassword(),
  host: EnviromentVariables.getHostDb(),
  port: 5432,
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

  static async createNewUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    usertoken: string
  ) {
    const user = await client.query<UserWithoutPassword>(
      `INSERT INTO public.users (firstname, lastname, email, password, usertoken) values ('${firstName}', '${lastName}', '${email}', '${password}', '${usertoken}') RETURNING firstname, lastname, email, usertoken`
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
}

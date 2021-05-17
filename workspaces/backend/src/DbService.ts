import { Client } from 'pg';
import { Base, Drone, User, UserWithoutPass, UserWithExists } from '../types';

const client = new Client({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.HOST,
  port: 5432 || process.env.DB_PORT,
  database: process.env.PGNAME,
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
    const user = await client.query<UserWithoutPass>(
      `INSERT INTO public.users (firstname, lastname, email, password, usertoken) values ('${firstName}', '${lastName}', '${email}', '${password}', '${usertoken}') RETURNING firstname, lastname, email, usertoken`
    );
    return user.rows[0];
  }

  static async getUserByEmail(email: string) {
    //? Cannot puth here the type because it does not work Promise<{err?: string} | UsertWithExists>
    const result = await client.query(
      //? Can't put type to the response also
      `SELECT * FROM public.users WHERE email='${email}'`
    );
    if (result.rows.length == 0) {
      return {
        exists: false,
        err: "User doesn't exists",
      };
    } else {
      return { exists: true, ...result.rows[0] };
    }
  }

  static async getUserByusertoken(
    usertoken: string
  ): Promise<{ err?: string } | UserWithoutPass> {
    const result = await client.query<UserWithoutPass>(
      `SELECT email, firstname, lastname, usertoken FROM public.users WHERE usertoken='${usertoken}'`
    );
    if (result.rows.length == 0) {
      return {
        err: "User doesn't exists",
      };
    } else {
      return result.rows[0];
    }
  }

  static async updateToken(email: string, usertoken: string) {
    const user = await client.query<UserWithoutPass>(
      `UPDATE public.users SET usertoken='${usertoken}' where email='${email}' RETURNING email, firstname, lastname, usertoken`
    );
    return user.rows[0];
  }
}

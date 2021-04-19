import { Client } from 'pg';
import Express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = Express();
const client = new Client({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: 'db',
  port: 5432,
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
    const result = await client.query('SELECT * FROM public.drones');
    return result.rows;
  }

  static async getBases() {
    const result = await client.query('SELECT * FROM public.bases');
    return result.rows;
  }

  static async getDroneByName(droneName: string) {
    console.log(droneName);
    const result = await client.query(
      `SELECT *  FROM public.drones WHERE name='${droneName}'`
    );
    return result.rows;
  }

  static async getBaseByName(baseName: string) {
    const result = await client.query(
      `SELECT * FROM public.bases WHERE name='${baseName}`
    );
    return result.rows;
  }

  static async getBasesByCity(cityName: string) {
    const result = await client.query(
      `SELECT * FROM public.bases WHERE city LIKE '${cityName}'`
    );
    return result.rows;
  }
}

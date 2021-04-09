import { Client } from 'pg';

export const connectDb = () => {
  const client = new Client({
    user: 'postgres',
    password: 'password',
    host: 'db',
    port: 5432,
    database: 'postgres',
  });
  client
    .connect()
    .then(() =>
      console.log(`💽[database]: Database connected in port ${client.port}`)
    )
    .then(() => client.query('SELECT * FROM public.test WHERE if LIKE "1"'))
    .then((results) => console.log(results.rows));
};

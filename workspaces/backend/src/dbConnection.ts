import { Client } from 'pg';

export const connectDb = () => {
  const client = new Client({
    user: 'postgres',
    password: 'password',
    host: 'localhost',
    port: 5432,
    database: 'postgres',
  });
  client
    .connect()
    .then(() =>
      console.log(`💽[database]: Database connected in port ${client.port}`)
    );
};

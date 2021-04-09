import Express from 'express';
import { connectDb } from './dbConnection';

const app = Express();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
);

connectDb();

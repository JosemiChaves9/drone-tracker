import Express from 'express';
import { bases } from '../mockData';
import { connectDb } from './dbConnection';

const app = Express();
const PORT = process.env.PORT || 4000;
app.get('/', (req, res) => res.send(bases));

app.listen(PORT, () =>
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
);

connectDb();

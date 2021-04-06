import Express from 'express';
import { bases } from '../mockData';

const app = Express();
const PORT = process.env.PORT || 4000;
app.get('/', (req, res) => res.send(bases));

app.listen(PORT, () =>
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
);

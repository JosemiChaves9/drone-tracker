import Express from 'express';
import { DbService } from './dbServices';
import dotenv from 'dotenv';

dotenv.config();

const app = Express();
const PORT = process.env.PORT || 4000;

DbService.connect().then(
  () => {
    app.listen(PORT, () =>
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
    );
  },
  () => {
    throw new Error(`can't connect to DB`);
  }
);
app.get('/drones', function (req, res) {
  DbService.getDrones().then((rows) => res.send(rows));
});

app.get('/bases', function (req, res) {
  DbService.getBases().then((rows) => res.send(rows));
});

app.get('/drone/:droneName', function (req, res) {
  const droneName = req.params.droneName;
  DbService.getDroneByName(droneName).then((rows) => res.send(rows));
});

app.get('/base/:baseName', function (req, res) {
  const baseName = req.params.baseName;
  DbService.getBaseByName(baseName).then((rows) => res.send(rows));
});

app.get('/bases/city/:cityName', function (req, res) {
  const cityName = req.params.cityName;
  console.log(cityName);
  DbService.getBasesByCity(cityName).then((rows) => res.send(rows));
});

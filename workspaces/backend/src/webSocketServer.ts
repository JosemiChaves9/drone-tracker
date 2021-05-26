import WebSocket from 'ws';
import { DroneService } from './services/DroneService';

export const startWebSocket = () => {
  const wss = new WebSocket.Server({ port: 8080 });

  wss.on('connection', function connection(ws, req) {
    //ws.send('WebSocket connected with client');

    DroneService.subscribeToDroneMovement('1MZ50', (point) =>
      ws.send(JSON.stringify(point))
    );
  });
};

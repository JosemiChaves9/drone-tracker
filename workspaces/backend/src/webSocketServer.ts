import WebSocket from 'ws';
import { DroneService } from './services/DroneService';

export const startWebSocket = () => {
  const wss = new WebSocket.Server({ port: 8080 });

  wss.on('connection', (ws, req) => {
    ws.send('WebSocket connected with client');

    if (!req.url) {
      wss.off('close', () => ws.send('data missing'));
    } else {
      DroneService.subscribeToDroneMovement(req.url, (point) =>
        ws.send(JSON.stringify(point))
      );
    }
  });
};

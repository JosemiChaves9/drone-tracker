import { Server } from 'http';
import WebSocket from 'ws';
import { DroneService } from './services/DroneService';
import { EnviromentVariables } from './services/EnviromentVariablesService';
const websocketEvent = require('debug')('websocket:events');

export const startWebSocket = (server: Server) => {
  const wss = new WebSocket.Server({
    server: server,
  });

  websocketEvent(
    `Websocket server created in ${EnviromentVariables.getPort()}`
  );

  wss.on('connection', (ws, req) => {
    websocketEvent(
      `Web socket has started with port ${EnviromentVariables.getPort()}`
    );
    if (!req.url) {
      websocketEvent('Data is missing');
      wss.off('close', () => ws.send('data missing'));
    } else {
      websocketEvent('Subscribe to drone movement');
      DroneService.subscribeToDroneMovement(req.url, (point) =>
        ws.send(JSON.stringify(point))
      );
    }
  });
};

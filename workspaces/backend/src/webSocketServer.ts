import WebSocket from 'ws';
import { generateRoute } from 'geo-route-generator';

export const startWebSocket = () => {
  const wss = new WebSocket.Server({ port: 8080 });

  const startPos = {
    lat: 39.568050480413135,
    lng: 2.6454209213066715,
  };

  const finalPos = {
    lat: 39.574175555836995,
    lng: 2.6503320102834405,
  };

  const steps = 800;
  const route = generateRoute(startPos, finalPos, steps);

  wss.on('connection', function connection(ws, req) {
    const recursive = (i = 0) => {
      setTimeout(() => {
        if (i < route.length) {
          const point = JSON.stringify({
            lat: route[i].lat,
            lng: route[i].lng,
          });
          ws.send(point);
          recursive(i + 1);
        } else {
          return;
        }
      }, 277);
    };

    recursive();
  });
};

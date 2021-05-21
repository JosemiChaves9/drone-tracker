import WebSocket from 'ws';
import { generateRoute } from 'geo-route-generator';

export const startWebSocket = () => {
  const wss = new WebSocket.Server({ port: 8080 });

  const startPos = {
    lat: 39.630385529846336,
    lng: 2.600505232421866,
  };

  const finalPos = {
    lat: 39.56266124941403,
    lng: 3.273417830078116,
  };

  const steps = 100;
  const route = generateRoute(startPos, finalPos, steps);

  wss.on('connection', function connection(ws) {
    debugger;
    ws.on('message', (message) => {
      if (message === 'Ready for data') {
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
          }, 150);
        };

        recursive();
      }
    });
  });
};

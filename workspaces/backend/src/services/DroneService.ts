import EventEmitter from 'events';
const events = require('debug')('droneservice:events');
const data = require('debug')('droneservice:data');
import { Address } from './types';

const emitter = new EventEmitter();

export class DroneService {
  static startMovement(
    droneName: string,
    route: { lat: number; lng: number }[]
  ) {
    const generatePoints = (i = 0) => {
      events('generating route poins');
      setTimeout(() => {
        if (i < route.length) {
          const point = {
            lat: route[i].lat,
            lng: route[i].lng,
            droneName: droneName,
          };
          emitter.emit(droneName, point);
          data(
            `emitted lng ${point.lng}, lat ${point.lat}, droneName ${point.droneName}`
          );
          generatePoints(i + 1);
        } else {
          return;
        }
      }, 500);
    };

    generatePoints();
  }

  static subscribeToDroneMovement(
    droneName: string,
    cb: (point: Address) => void
  ) {
    events(`Subscribed with ${droneName}`);
    emitter.on(droneName, cb);
    return () => {
      emitter.off(droneName, cb);
    };
  }
}

// const unsubscribe = DroneService.subscribeToDroneMovement('1MZ50', () => {});
// unsubscribe();

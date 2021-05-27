import EventEmitter from 'events';
import { Coordinates } from '../../types';

const emitter = new EventEmitter();

export class DroneService {
  static startMovement(
    droneName: string,
    route: { lat: number; lng: number }[]
  ) {
    const generatePoints = (i = 0) => {
      setTimeout(() => {
        if (i < route.length) {
          const point = {
            lat: route[i].lat,
            lng: route[i].lng,
            droneName: droneName,
          };
          emitter.emit(droneName, point);
          generatePoints(i + 1);
        } else {
          return;
        }
      }, 277);
    };

    generatePoints();
  }

  static subscribeToDroneMovement(
    droneName: string,
    cb: (point: Coordinates) => void
  ) {
    emitter.on(droneName, cb);
    return () => {
      emitter.off(droneName, cb);
    };
  }
}

// const unsubscribe = DroneService.subscribeToDroneMovement('1MZ50', () => {});
// unsubscribe();

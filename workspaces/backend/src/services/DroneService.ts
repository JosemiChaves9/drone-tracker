import EventEmitter from 'events';

const emitter = new EventEmitter();

export class DroneService {
  static startMovement(
    droneName: string,
    route: { lat: number; lng: number }[]
  ) {
    const recursive = (i = 0) => {
      setTimeout(() => {
        if (i < route.length) {
          const point = {
            lat: route[i].lat,
            lng: route[i].lng,
          };
          emitter.emit('1MZ50', point);
          recursive(i + 1);
        } else {
          return;
        }
      }, 277);
    };

    recursive();
  }

  static subscribeToDroneMovement(
    droneName: string,
    cb: (point: { lat: number; lng: number }) => void
  ) {
    emitter.on('1MZ50', cb);
    //return () => emitter.off(droneName, cb);
  }
}

// const unsubscribe = DroneService.subscribeToDroneMovement(
//   'ABCE',
//   (lat, lng) => {
//     console.log(lat, lng);
//   }
// );

//unsubscribe();

import { latLng } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import './index.scss';
import { BaseLayout } from '../../components/BaseLayout';
import { useEffect, useState } from 'react';
import {
  ApiBase,
  ApiDrone,
  ApiWebSocketResponse,
  Coordinates,
} from '../../types';
import { ApiService } from '../../services/ApiService';
import { EnviromentVariables } from '../../services/EnviromentVariablesService';
import { endIcon, startIcon } from '../../icons/markersIcon';
import { droneIcon } from '../../icons/droneIcon';
import { baseIcon } from '../../icons/baseIcon';

export const Home = () => {
  const [droneMoving, setDroneMoving] = useState<ApiDrone[] | null>(null);
  const [bases, setBases] = useState<ApiBase[]>();
  // eslint-disable-next-line
  const [actualPos, setActualPos] = useState<Coordinates>({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    ApiService.getBases().then((res: ApiBase[]) => {
      setBases(res);
    });

    const ws = new WebSocket(
      `${EnviromentVariables.getWebSocketAddress()}/1MZ50`
    );

    const getDroneMoving = async (droneName: string) => {
      await ApiService.getDrones().then(
        (res) => {
          setDroneMoving(res.filter((drone) => drone.name === droneName));
        },
        () => {}
      );
    };

    getDroneMoving('1MZ50');

    ws.onmessage = (message) => {
      const point: ApiWebSocketResponse = JSON.parse(message.data);
      setActualPos({
        lat: point.lat,
        lng: point.lng,
      });
    };
  }, []);

  return (
    <BaseLayout>
      <div>
        <MapContainer
          center={[39.626521, 2.969894]}
          zoom={10}
          scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank"> <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>  contributors'
            url='https://{s}.tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token={accessToken}'
            accessToken={EnviromentVariables.getMapAccessToken()}
          />

          {droneMoving && (
            <>
              {droneMoving.map((drone) => {
                return (
                  <>
                    <Marker
                      position={latLng({
                        lat: drone.from_lat,
                        lng: drone.from_lng,
                      })}
                      icon={startIcon}>
                      <Popup className='actualPos'>From {drone.name}</Popup>
                    </Marker>
                    <Marker
                      position={latLng({
                        lat: drone.to_lat,
                        lng: drone.to_lng,
                      })}
                      icon={endIcon}>
                      <Popup className='actualPos'>To {drone.name}</Popup>
                    </Marker>
                  </>
                );
              })}

              {bases?.map((base) => {
                return (
                  <>
                    <Marker
                      position={latLng({
                        lat: base.lat,
                        lng: base.lng,
                      })}
                      icon={baseIcon}>
                      <Popup className='actualPos'>{base.name}</Popup>
                    </Marker>
                  </>
                );
              })}

              <Marker position={latLng(actualPos)} icon={droneIcon}>
                <Popup className='actualPos'>
                  {droneMoving.map((drone) => {
                    return (
                      <>
                        <p>Drone: {drone.name}</p>
                      </>
                    );
                  })}
                </Popup>
              </Marker>
            </>
          )}
        </MapContainer>
      </div>
    </BaseLayout>
  );
};

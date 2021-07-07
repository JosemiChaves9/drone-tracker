import { latLng } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import './index.scss';
import { BaseLayout } from '../../components/BaseLayout';
import { useEffect, useState } from 'react';
import { ApiDrone, ApiWebSocketResponse, Coordinates } from '../../types';
import { ApiService } from '../../services/ApiService';
import { EnviromentVariables } from '../../services/EnviromentVariablesService';

export const Home = () => {
  const [droneMoving, setDroneMoving] = useState<ApiDrone[] | null>(null);
  // eslint-disable-next-line
  const [actualPos, setActualPos] = useState<Coordinates>({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    const ws = new WebSocket(
      `${EnviromentVariables.getWebSocketAddressAndPort()}/1MZ50`
    );

    const getDroneMoving = async (droneName: string) => {
      await ApiService.getDrones().then((res) => {
        setDroneMoving(res.filter((drone) => drone.name === droneName));
      });
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
          center={[39.5695818, 2.6500745]}
          zoom={14}
          scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank"> <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token={accessToken}'
            accessToken={EnviromentVariables.getMapAccessToken()}
          />

          {droneMoving?.map((drone) => {
            return (
              <>
                <Marker
                  position={latLng({
                    lat: drone.from_lat,
                    lng: drone.from_lng,
                  })}>
                  <Popup className='actualPos'>From {drone.name}</Popup>
                </Marker>
                <Marker
                  position={latLng({
                    lat: drone.to_lat,
                    lng: drone.to_lng,
                  })}>
                  <Popup className='actualPos'>To {drone.name}</Popup>
                </Marker>
              </>
            );
          })}

          <Marker position={latLng(actualPos)}>
            <Popup className='actualPos'>
              {droneMoving?.map((drone) => drone.name)}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </BaseLayout>
  );
};

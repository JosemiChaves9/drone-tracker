import { latLng } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import './index.scss';
import { BaseLayout } from '../../components/BaseLayout';
import { useEffect, useState } from 'react';
import { ApiDrone, ApiWebSocketResponse, Coordinates } from '../../types';
import { ApiService } from '../../services/ApiService';

export const Home = () => {
  // eslint-disable-next-line
  const [actualPos, setActualPos] = useState<Coordinates>({
    lat: 0,
    lng: 0,
  });
  const [drones, setDrones] = useState<ApiDrone[] | null>(null);
  useEffect(() => {
    ApiService.getDrones().then((res) => setDrones(res));
  }, []);

  useEffect(() => {
    if (!drones) {
      return;
    } else {
      const drone = drones.find((element: any) => element.name === '1MZ50');
      console.log(drone);
    }
  }, [drones]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/1MZ50');

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
            accessToken={process.env.REACT_APP_MAP_ACCESS_TOKEN}
          />

          {drones ? (
            <>
              <Marker
                position={latLng({
                  lat: drones[0].from_lat,
                  lng: drones[0].from_lng,
                })}>
                <Popup className='actualPos'>From {drones[0].name}</Popup>
              </Marker>
              <Marker
                position={latLng({
                  lat: drones[0].to_lat,
                  lng: drones[0].to_lng,
                })}>
                <Popup className='actualPos'>To {drones[0].name}</Popup>
              </Marker>
            </>
          ) : (
            ''
          )}

          <Marker position={latLng(actualPos as { lat: number; lng: number })}>
            <Popup className='actualPos'>{drones ? drones[0].name : ''}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </BaseLayout>
  );
};

import { latLng } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import './index.scss';
import { BaseLayout } from '../../components/BaseLayout';
import { useEffect, useState } from 'react';
import { Coordinates } from '../../types';

export const Home = () => {
  // eslint-disable-next-line
  const [actualPos, setActualPos] = useState<Coordinates>({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/1MZ50');

    ws.onmessage = (message) => {
      const point: Coordinates = JSON.parse(message.data);
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

          <Marker position={latLng(actualPos)}>
            <Popup className='actualPos'>Actual Position</Popup>
          </Marker>
        </MapContainer>
      </div>
    </BaseLayout>
  );
};

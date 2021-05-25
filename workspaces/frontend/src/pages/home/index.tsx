import { useEffect, useState } from 'react';
import { latLng } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import './index.scss';
import { BaseLayout } from '../../components/BaseLayout';
import L from 'leaflet';

export const Home = () => {
  const [actualPos, setActualPos] = useState({
    lat: 39.630385529846336,
    lng: 2.600505232421866,
  });

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('Connected');
      socket.send('Hello server');
    };

    socket.onmessage = (event: any) => {
      setActualPos(JSON.parse(event.data));
    };
  }, []);

  const droneIcon = L.icon({
    iconUrl: '/droneIcon.png',
    iconSize: [48, 48],
    iconAnchor: [20, 0],
  });
  const startIcon = L.icon({
    iconUrl: '/startIcon.svg',
    iconSize: [36, 50],
  });
  const endIcon = L.icon({
    iconUrl: '/endIcon.svg',
    iconSize: [36, 50],
  });

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
          <Marker
            position={latLng(39.568050480413135, 2.6454209213066715)}
            icon={startIcon}>
            <Popup>Start Position</Popup>
          </Marker>
          {actualPos ? (
            <Marker position={latLng(actualPos)} icon={droneIcon}>
              <Popup className='actualPos'>Actual Position</Popup>
            </Marker>
          ) : (
            ''
          )}
          <Marker
            position={latLng(39.574175555836995, 2.6503320102834405)}
            icon={endIcon}>
            <Popup>End Position</Popup>
          </Marker>
        </MapContainer>

        <button
          onClick={() => {
            // socket.send('Ready for data');
          }}
          className='mt-2 btn btn-primary'>
          Change position
        </button>
      </div>
    </BaseLayout>
  );
};

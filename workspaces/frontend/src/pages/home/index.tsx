import { useEffect, useState } from 'react';
import { latLng } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import './index.scss';
import { BaseLayout } from '../../components/BaseLayout';

export const Home = () => {
  const socket = new WebSocket('ws://localhost:8080');
  const [actualPos, setActualPos] = useState({
    lat: 39.630385529846336,
    lng: 2.600505232421866,
  });
  const [route, setRoute] = useState<any>();

  useEffect(() => {
    socket.onopen = () => {
      console.log('Connected');
      socket.send('Hello server');
    };

    socket.onmessage = (event: any) => {
      setActualPos(JSON.parse(event.data));
    };
  }, []);

  return (
    <BaseLayout>
      <div>
        <MapContainer
          center={[39.634929, 2.976627]}
          zoom={10}
          scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank"> <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token={accessToken}'
            accessToken={process.env.REACT_APP_MAP_ACCESS_TOKEN}
          />
          <Marker position={latLng(39.630385529846336, 2.600505232421866)}>
            <Popup>Start Position</Popup>
          </Marker>
          <Marker position={latLng(actualPos)}>
            <Popup className='actualPos'>Actual Position</Popup>
          </Marker>

          <Marker position={latLng(39.56266124941403, 3.273417830078116)}>
            <Popup>End Position</Popup>
          </Marker>
        </MapContainer>

        <button
          onClick={() => {
            socket.send('Ready for data');
          }}
          className='mt-2 btn btn-primary'>
          Change position
        </button>
      </div>
    </BaseLayout>
  );
};

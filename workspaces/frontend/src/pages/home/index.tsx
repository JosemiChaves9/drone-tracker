import { latLng } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import './index.scss';
import { BaseLayout } from '../../components/BaseLayout';

export const Home = () => {
  // eslint-disable-next-line
  const actualPos = {
    lat: 39.630385529846336,
    lng: 2.600505232421866,
  };

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
          <Marker position={latLng(39.568050480413135, 2.6454209213066715)}>
            <Popup>Start Position</Popup>
          </Marker>

          <Marker position={latLng(actualPos)}>
            <Popup className='actualPos'>
              <h1>Hee</h1>
              <button onClick={() => console.log('ye')}>eee</button>
              Actual Position
            </Popup>
          </Marker>

          <Marker position={latLng(39.574175555836995, 2.6503320102834405)}>
            <Popup>End Position</Popup>
          </Marker>
        </MapContainer>

        <button onClick={() => {}} className='mt-2 btn btn-primary'>
          Change position
        </button>
      </div>
    </BaseLayout>
  );
};

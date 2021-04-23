import axios from 'axios';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { BaseLayout } from '../../components/BaseLayout';

export const BasesView = () => {
  const [response, setResponse] = useState([]);
  interface base {
    city: string;
    id: number;
    lat: number;
    lon: number;
    name: string;
    number: number;
    postcode: string;
    street: string;
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ADDRESS}/bases`).then((response) => {
      setResponse(response.data);
    });
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
          {response.map((base: base) => {
            return (
              <Marker position={[base.lat, base.lon]}>
                <Popup>{base.name}</Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </BaseLayout>
  );
};

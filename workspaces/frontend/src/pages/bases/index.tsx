import axios from 'axios';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { BaseLayout } from '../../components/basePage';

export const BasesView = () => {
  const [response, setResponse] = useState([]);

  interface base {
    city: string;
    id: number;
    lat: number;
    lng: number;
    name: string;
    number: number;
    postcode: string;
    street: string;
  }

  useEffect(() => {
    axios.get('http://localhost:4000/bases').then((response) => {
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
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}'
            accessToken='UrOQiBU4MfHPv8NeuE5h75QU5iWP05muWOcTLwJoBZTErJe5CCa3YXM2Co1aYEJ7'
          />
          {response.map((base: base) => {
            return (
              <Marker position={[base.lat, base.lng]}>
                <Popup>{base.name}</Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </BaseLayout>
  );
};

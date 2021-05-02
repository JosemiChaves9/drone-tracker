import axios from 'axios';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Redirect } from 'react-router';
import { BaseLayout } from '../../components/BaseLayout';
import { ApiService } from '../../services/apiService';

export const BasesView = () => {
  const [res, setRes] = useState([]);
  const [err, setErr] = useState('');

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
    ApiService.getBases().then(
      (res) => {
        console.log(res);
        setRes(res);
      },
      (rej) => {
        if (rej.status === 401) {
          setErr('You need to login...');
        }
      }
    );
  }, []);

  if (err) {
    return <Redirect exact to='/login' />;
  }

  return (
    <BaseLayout>
      <div>
        {err ? (
          <h1>{err}</h1>
        ) : (
          <MapContainer
            center={[39.634929, 2.976627]}
            zoom={10}
            scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank"> <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token={accessToken}'
              accessToken={process.env.REACT_APP_MAP_ACCESS_TOKEN}
            />
            {res.map((base: base) => {
              return (
                <Marker position={[base.lat, base.lon]}>
                  <Popup>{base.name}</Popup>
                </Marker>
              );
            })}
          </MapContainer>
        )}
      </div>
    </BaseLayout>
  );
};

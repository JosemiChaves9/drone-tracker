import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Redirect } from 'react-router';
import { BaseLayout } from '../../components/BaseLayout';
import Leaflet from 'leaflet';
import { ApiService } from '../../services/ApiService';
import { EnviromentVariables } from '../../services/EnviromentVariablesService';
import type { ApiBase } from '../../types';
import { baseIcon } from '../../icons/baseIcon';

export const BasesView = () => {
  const [bases, setBases] = useState<ApiBase[]>([]);
  const [err, setErr] = useState<string>('');

  useEffect(() => {
    ApiService.getBases().then(
      (bases: ApiBase[]) => {
        setBases(bases);
      },
      (rej) => {
        if (rej.status === 401) {
          setErr('ERR_USER_NOT_LOGGED');
        }
      }
    );
  }, []);

  return (
    <BaseLayout>
      <div>
        {err && (
          <>
            <Redirect to='/login' />
          </>
        )}
        <MapContainer
          center={[39.634929, 2.976627]}
          zoom={10}
          scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank"> <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token={accessToken}'
            accessToken={EnviromentVariables.getMapAccessToken()}
          />
          {bases.map((base: ApiBase) => {
            return (
              <Marker position={[base.lat, base.lng]} icon={baseIcon}>
                <Popup>{base.name}</Popup>
              </Marker>
            );
          })}
        </MapContainer>
        )
      </div>
    </BaseLayout>
  );
};

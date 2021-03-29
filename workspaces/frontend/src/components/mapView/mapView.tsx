import { latLng } from 'leaflet';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Sidebar } from '../sidebar';
import { NavBar } from '../navbar/navBar';
import './mapViewStyles.scss';
import { generateRoute } from 'geo-route-generator';
import { start } from 'node:repl';

const MapView = () => {
  const startPos = {
    lat: 45.385348723467,
    lng: -72.644464557683,
  };

  const finalPos = {
    lat: 29.384348971766,
    lng: -85.526861831764,
  };

  const [actualPos, setActualPos] = useState(startPos);

  const steps = 50;

  const route = generateRoute(startPos, finalPos, steps);

  const changeLocation = (i: number = 0) => {
    setTimeout(() => {
      setActualPos(() => {
        console.log(route[i]);
        return {
          lat: route[i].lat,
          lng: route[i].lng,
        };
      });
      i < steps - 1 && changeLocation(i + 1);
    }, 500);
  };

  return (
    <>
      <div id='wrapper'>
        <Sidebar />
        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <NavBar />

            <div className='container-fluid'>
              <div>
                <MapContainer
                  center={latLng(actualPos)}
                  zoom={5}
                  scrollWheelZoom={true}>
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  />
                  <Marker position={latLng(startPos)}>
                    <Popup>Start Position</Popup>
                  </Marker>
                  <Marker position={latLng(actualPos)}>
                    <Popup className='actualPos'>Actual Position</Popup>
                  </Marker>

                  <Marker position={latLng(finalPos)}>
                    <Popup>End Position</Popup>
                  </Marker>
                </MapContainer>
                <button
                  onClick={() => changeLocation()}
                  className='mt-2 btn btn-primary'>
                  Change position
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapView;

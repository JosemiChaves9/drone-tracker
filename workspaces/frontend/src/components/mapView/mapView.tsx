import { latLng } from 'leaflet';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Sidebar } from '../sidebar';
import { NavBar } from '../navbar/navBar';
import './mapViewStyles.scss';
import { generateRoute } from 'geo-route-generator';

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

  const route = generateRoute(startPos, finalPos, 100);

  const changeLocation = async () => {
    setActualPos(startPos);
    for (let i = 0; i < 100; i++) {
      await new Promise((res) => {
        setTimeout(() => res(''), 200);
      });
      setActualPos(() => {
        console.log(route[i]);
        return {
          lat: route[i].lat,
          lng: route[i].lng,
        };
      });
    }
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
                  zoom={12}
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

import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { latLng } from 'leaflet';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Sidebar } from './components/sidebar';
import { NavBar } from './components/navbar';
import { generateRoute } from 'geo-route-generator';

const App = () => {
  const startPos = {
    lat: 40.413599,
    lng: -3.709558,
  };

  const finalPos = {
    lat: -47.190444,
    lng: -69.286307,
  };

  const [actualPos, setActualPos] = useState(startPos);
  const steps = 100;
  const route = generateRoute(startPos, finalPos, steps);

  const changeLocation = (i: number = 0) => {
    setTimeout(() => {
      setActualPos(() => {
        console.log(`Index ${i} lat: ${route[i].lat}, lng: ${route[i].lng}`);
        return {
          lat: route[i].lat,
          lng: route[i].lng,
        };
      });
      i < steps - 1 && changeLocation(i + 1);
    }, 100);
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

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

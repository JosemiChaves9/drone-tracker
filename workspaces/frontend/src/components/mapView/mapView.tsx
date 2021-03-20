import { latLng } from 'leaflet';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Sidebar } from '../sidebar';
import { NavBar } from '../navbar/navBar';
import './mapViewStyles.scss';

const MapView = () => {
  const startPos = {
    lat: 39.539705,
    lng: 2.740096,
  };

  const finalPos = {
    lat: 39.57184,
    lng: 2.643305,
  };

  const [actualPos, setActualPos] = useState(startPos);

  //Generate array first, and then iterate in this array

  const changeLocation = async () => {
    while (actualPos.lat && actualPos.lng > finalPos.lng && finalPos.lat) {
      await new Promise((res) => {
        console.log(actualPos);
        setTimeout(() => res(''), 500);
      });
      setActualPos((prevPos) => {
        return {
          lat: prevPos.lat + 0.0032135,
          lng: prevPos.lng - 0.0096791,
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
                  zoom={13}
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

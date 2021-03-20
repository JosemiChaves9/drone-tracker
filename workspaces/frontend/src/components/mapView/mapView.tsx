import { latLng } from 'leaflet';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Sidebar } from '../sidebar';
import { NavBar } from '../navbar/navBar';
import './mapViewStyles.scss';

const MapView = () => {
  const startPos = {
    lat: 40.0,
    lng: 1.0,
  };

  const finalPos = {
    lat: 40.1,
    lng: 1.100001,
  };

  const [actualPos, setActualPos] = useState(startPos);

  const checkIfArrived = () => {
    if (actualPos.lat && actualPos.lng < finalPos.lng && finalPos.lat) {
      return true;
    } else {
      return false;
    }
  };

  //Generate array first, and then iterate in this array

  const changeLocation = async () => {
    while (actualPos.lat && actualPos.lng < finalPos.lng && finalPos.lat) {
      await new Promise((res) => {
        console.log(actualPos);
        setTimeout(() => res(''), 500);
      });
      setActualPos((prevPos) => {
        return {
          lat: prevPos.lat + 0.01,
          lng: prevPos.lng + 0.01,
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
                  zoom={8}
                  scrollWheelZoom={false}>
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

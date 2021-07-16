import Leaflet from 'leaflet';

export const droneIcon = new Leaflet.Icon({
  iconUrl: '/droneIcon.png',
  iconAnchor: [15, 40],
  popupAnchor: [10, -40],
  iconSize: [48, 48],
});

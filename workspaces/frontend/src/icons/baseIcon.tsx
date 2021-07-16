import Leaflet from 'leaflet';

export const baseIcon = new Leaflet.Icon({
  iconUrl: '/baseIcon.png',
  iconAnchor: [15, 40],
  popupAnchor: [0, -40],
  iconSize: [30, 40],
});

import Leaflet from 'leaflet';

export const startIcon = new Leaflet.Icon({
  iconUrl: '/startIcon.png',
  iconAnchor: [15, 40],
  popupAnchor: [-5, -40],
  iconSize: [25, 41],
});

export const endIcon = new Leaflet.Icon({
  iconUrl: '/endIcon.png',
  iconAnchor: [15, 40],
  popupAnchor: [-5, -40],
  iconSize: [25, 41],
});

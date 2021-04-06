export const bases = [
  {
    name: 'Amazon palma',
    location: {
      lat: 39.539718,
      lng: 2.740106,
    },
    street: 'Carrer Can Gamundi, 20, 07199, Illes Balears',
  },
  {
    name: 'UPS Mallorca',
    location: {
      lat: 39.599613,
      lng: 2.664156,
    },
    street: 'Vial San José, 36L, 07009 Palma, Balearic Islands',
  },
  {
    name: 'SEUR',
    location: {
      lat: 39.603063,
      lng: 2.663989,
    },
    street: 'Gremi des Fusters, 8, 07009 Palma, Illes Balears',
  },
];

export const drones = [
  {
    id: '1MZ50',
    from: bases[0].location,
    to: {
      lat: 123.59479,
      lng: 52.1564658,
    },
    speed: 20,
    battery: 56,
  },
  {
    id: 'MJYTE',
    from: bases[1].location,
    to: {
      lat: 123.59479,
      lng: 52.1564658,
    },
    speed: 1,
    battery: 93,
  },
  {
    id: '8A0A7',
    from: bases[2].location,
    to: {
      lat: 123.59479,
      lng: 52.1564658,
    },
    speed: 15,
    battery: 16,
  },
];

export interface Drone {
  id: string;
  name: string;
  from: string;
  to_lat: number;
  to_lon: number;
  speed: number;
  battery: number;
  address: string;
}

export interface Base {
  id: string;
  name: string;
  number: string;
  postcode: string;
  city: string;
  lat: number;
  lon: number;
}

export interface User {
  name: string;
  lastName: string;
  email: string;
  password: string;
  token: string;
}

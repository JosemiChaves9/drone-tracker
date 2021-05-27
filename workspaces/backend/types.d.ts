export interface Drone {
  id: string;
  name: string;
  from_lat: number;
  from_lng: number;
  to_lat: number;
  to_lng: number;
  speed: number;
  battery: number;
  address?: string;
}

export interface Base {
  id: string;
  name: string;
  number: string;
  postcode: string;
  city: string;
  lat: number;
  lng: number;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  usertoken: string;
}
export interface UserWithoutPassword {
  firstName: string;
  lastName: string;
  email: string;
  usertoken: string;
}

export interface Coordinates {
  lng: number;
  lat: number;
}

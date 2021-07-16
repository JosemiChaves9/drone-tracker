export interface Drone {
  id: string;
  name: string;
  address_from: string;
  address_to: string;
  speed: number;
  battery: number;
  to_lng: number;
  to_lat: number;
  from_lng: number;
  from_lat: number;
}

export interface Base {
  id: string;
  name: string;
  street: string;
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

export interface Address {
  lng: number;
  lat: number;
  formatted: string;
}

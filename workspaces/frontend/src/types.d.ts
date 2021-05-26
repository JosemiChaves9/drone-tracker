export interface ApiDrone {
  id: string;
  name: string;
  from: string;
  to_lat: number;
  to_lon: number;
  speed: number;
  battery: number;
  address?: string;
}

interface ApiBase {
  city: string;
  id: number;
  lat: number;
  lon: number;
  name: string;
  number: number;
  postcode: string;
  street: string;
}
export interface NewUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordCheck: string;
}

export interface LoginUser {
  email: string;
  password: string;
}
export interface ApiUserCreationResponse {
  firstName: string;
  lastName: string;
  email: string;
  usertoken: string;
  ok: boolean;
  tokenExpirationTime: string;
}
export interface ApiUserLoginResponse {
  firstname: string;
  lastname: string;
  email: string;
  usertoken: string;
  ok: boolean;
}
export interface ApiErrorResponse {
  err: string;
  ok: boolean;
}
interface NewAddress {
  droneName: string;
  addressFrom: string;
  addressTo: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}

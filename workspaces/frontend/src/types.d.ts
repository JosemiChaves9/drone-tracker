export interface ApiDrone {
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
interface ApiBase {
  city: string;
  id: number;
  lat: number;
  lng: number;
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
interface NewDelivery {
  droneName: string;
  addressFrom: string;
  addressTo: string;
}

interface ApiWebSocketResponse {
  lat: number;
  lng: number;
  droneName: string;
}
interface Coordinates {
  lat: number;
  lng: number;
}

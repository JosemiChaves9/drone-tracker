import axios, { AxiosResponse } from 'axios';
import type {
  ApiBase,
  ApiDrone,
  ApiUserCreationResponse,
  ApiUserLoginResponse,
  LoginUser,
  NewUser,
  ApiGenericResponse,
  NewDelivery,
} from '../types';
import { EnviromentVariables } from './EnviromentVariablesService';

const instance = axios.create({
  baseURL: EnviromentVariables.getServerAddress(),
});

instance.interceptors.request.use((req) => {
  req.headers.authorization = localStorage.getItem('usertoken');
  return req;
});
export class ApiService {
  static async getBases() {
    return instance.get('/bases').then(
      (data: AxiosResponse<ApiBase[]>) => data.data,
      (res) => Promise.reject(res.response)
    );
  }

  static async getDrones() {
    return instance.get('/drones').then(
      (data: AxiosResponse<ApiDrone[]>) => data.data,
      (res) => Promise.reject(res.response)
    );
  }

  static async getUserByUsertoken(usertoken: string) {
    const user: AxiosResponse<ApiUserLoginResponse | ApiGenericResponse> =
      await instance.get(`/user/usertoken/${usertoken}`);
    return user.data;
  }

  static async createNewUser(data: NewUser) {
    const user: AxiosResponse<ApiUserCreationResponse | ApiGenericResponse> =
      await instance.post(`/user/newuser`, data);
    if (user.data.ok) {
      return user.data as ApiUserCreationResponse;
    } else {
      return user.data as ApiGenericResponse;
    }
  }

  static async loginUser(data: LoginUser) {
    const user: AxiosResponse<ApiUserLoginResponse | ApiGenericResponse> =
      await instance.put('/user/login', data);
    return user.data;
  }

  static async newDelivery(data: NewDelivery) {
    const response: AxiosResponse<ApiGenericResponse> = await instance.post(
      `/drone/newDelivery/?droneName=${data.droneName}&from=${data.addressFrom}&to=${data.addressTo}`,
      data
    );
    return response.data;
  }

  static async newDrone(data: { droneName: string; baseName: string }) {
    const drone: AxiosResponse<ApiGenericResponse> = await instance.post(
      '/drone/newDrone',
      data
    );
    return drone.data;
  }

  static async newBase(data: {
    baseName: string;
    baseStreetName: string;
    baseBuildingNumber: string;
    baseCity: string;
    baseCityPostalcode: string;
  }) {
    const base: AxiosResponse<ApiGenericResponse> = await instance.post(
      '/base/newBase',
      data
    );
    return base.data;
  }
}

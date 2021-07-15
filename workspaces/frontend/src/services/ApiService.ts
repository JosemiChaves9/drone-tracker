import axios, { AxiosResponse } from 'axios';
import type {
  ApiBase,
  ApiDrone,
  ApiUserCreationResponse,
  ApiUserLoginResponse,
  LoginUser,
  NewUser,
  ApiErrorResponse,
  NewDelivery,
} from '../types';
import { EnviromentVariables } from './EnviromentVariablesService';

const instance = axios.create({
  baseURL: `${EnviromentVariables.getServerAddress()}:4000`,
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
    const user: AxiosResponse<ApiUserLoginResponse | ApiErrorResponse> =
      await instance.get(`/user/usertoken/${usertoken}`);
    return user.data;
  }

  static async createNewUser(data: NewUser) {
    const user: AxiosResponse<ApiUserCreationResponse | ApiErrorResponse> =
      await instance.post(`/user/newuser`, data);
    if (user.data.ok) {
      return user.data as ApiUserCreationResponse;
    } else {
      return user.data as ApiErrorResponse;
    }
  }

  static async loginUser(data: LoginUser) {
    const user: AxiosResponse<ApiUserLoginResponse | ApiErrorResponse> =
      await instance.put('/user/login', data);
    return user.data;
  }

  static async newDelivery(data: NewDelivery) {
    const response: AxiosResponse<{ ok: boolean; err: string }> =
      await instance.post(
        `/drone/newDelivery/?droneName=${data.droneName}&from=${data.addressFrom}&to=${data.addressTo}`,
        data
      );
    return response.data;
  }

  static async addBase(data: { droneName: string; base: ApiBase }) {
    const drone: AxiosResponse<{ ok: boolean; err: string }> =
      await instance.post('/drone/newDrone', data);
    return drone.data;
  }
}

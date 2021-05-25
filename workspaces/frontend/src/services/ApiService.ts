import axios, { AxiosResponse } from 'axios';
import type {
  ApiBase,
  ApiDrone,
  ApiUserCreationResponse,
  ApiUserLoginResponse,
  LoginUser,
  NewUser,
  ApiErrorResponse,
} from '../types';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ADDRESS,
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
}

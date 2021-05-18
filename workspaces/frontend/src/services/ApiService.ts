import axios, { AxiosResponse } from 'axios';
import type {
  Base,
  Drone,
  UserCreationResponse,
  UserLoginResponse,
  LoginUser,
  NewUser,
  ContextUser,
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
      (data: AxiosResponse<Base[]>) => data.data,
      (res) => Promise.reject(res.response)
    );
  }

  static async getDrones() {
    return instance.get('/drones').then(
      (data: AxiosResponse<Drone[]>) => data.data,
      (res) => Promise.reject(res.response)
    );
  }

  static async getUserByUsertoken(usertoken: string) {
    const user: AxiosResponse<ContextUser> = await instance.get(
      `/user/usertoken/${usertoken}`
    );
    return user.data;
  }

  static async createNewUser(data: NewUser) {
    const user: AxiosResponse<UserCreationResponse> = await instance.post(
      `/user/newuser`,
      data
    );
    return user.data;
  }

  static async loginUser(data: LoginUser) {
    const user: AxiosResponse<UserLoginResponse> = await instance.put(
      '/user/login',
      data
    );
    return user.data;
  }
}

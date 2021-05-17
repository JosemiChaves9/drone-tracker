import axios, { AxiosResponse } from 'axios';
import { setLocalStorage } from '../hooks/setLocalStorage';
import type { Base, UserCredentials, Drone, ContextUser } from '../types';

const { getLocalStorageKey } = setLocalStorage();

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ADDRESS,
});

instance.interceptors.request.use((req) => {
  req.headers.authorization = getLocalStorageKey('usertoken');
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

  static async getUserByEmail(email: string) {
    const user = await instance.get(`/user/email/${email}`);
    return user.data;
  }

  static async getUserByusertoken(usertoken: string): Promise<ContextUser> {
    const user = await instance.get(`/user/usertoken/${usertoken}`);
    return user.data;
  }

  static async createNewUser(data: UserCredentials) {
    const user = await instance.post(`/user/newuser`, data);
    return user.data;
  }

  static async loginUser(data: UserCredentials) {
    const user = await instance.put('/user/login', data);
    return user.data;
  }
}

import axios from 'axios';

const usertoken = localStorage.getItem('usertoken');

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ADDRESS,
  headers: {
    usertoken: usertoken,
  },
});

interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordCheck: string;
}

interface LoginUser {
  email: string;
  password: string;
}
export class ApiService {
  static async getBases() {
    return await instance.get('/bases').then(
      (data) => data.data,
      (res) => Promise.reject(res.response)
    );
  }

  static async getDrones() {
    return await instance.get('/drones').then(
      (data) => data.data,
      (res) => Promise.reject(res.response)
    );
  }

  static async getUserByEmail(email: string) {
    const user = await instance.get(`/user/email/${email}`);
    return user.data;
  }

  static async getUserByusertoken() {
    const user = await instance.get(`/user/token`);
    return user.data;
  }

  static async createNewUser(data: NewUser) {
    const user = await instance.post(`/newUser`, data);
    return user.data;
  }

  static async loginUser(data: LoginUser) {
    const user = await instance.put('/login', data);
    return user.data;
  }
}

import axios from 'axios';

const userToken = localStorage.getItem('userToken');

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ADDRESS,
  headers: {
    userToken: userToken,
  },
});

type newUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordCheck: string;
};

type Base = {
  id: number;
  lat: number;
  lon: number;
  city: string;
  name: string;
  number: string;
  postalcode: string;
  street: string;
};

type loginUser = {
  email: string;
  password: string;
};
export class ApiService {
  static async getBases() {
    return await instance.get('/bases').then(
      (data) => data.data,
      (res) => Promise.reject(res.response)
    );
  }

  static async getDrones() {
    const drones = await instance.get('/drones');
    return drones.data;
  }

  static async getUserByEmail(email: string) {
    const user = await instance.get(`/user/email/${email}`);
    return user.data;
  }

  static async getUserByUserToken(userToken: string) {
    const user = await instance.get(`/user/email/${userToken}`);
    return user.data;
  }

  static async createNewUser(data: newUser) {
    const user = await instance.post(`/user`, data);
    return user.data;
  }

  static async loginUser(data: loginUser) {
    const user = await instance.put('/login', data);
    return user.data;
  }
}

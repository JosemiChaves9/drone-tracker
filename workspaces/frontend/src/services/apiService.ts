import axios from 'axios';

const userToken = localStorage.getItem('userToken');

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ADDRESS,
  headers: {
    userToken: userToken,
  },
});

export class ApiService {
  static async getBases() {
    const bases = await instance.get('/bases');
    return bases.data;
  }

  static async getDrones() {
    const drones = await instance.get('/drones');
    return drones.data;
  }
}

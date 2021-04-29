import axios from 'axios';

const userToken = localStorage.getItem('userToken');

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ADDRESS,
  headers: {
    userToken: userToken,
  },
});

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordCheck: string;
};

export class ApiService {
  static async getBases() {
    try {
      const bases = await instance.get('/bases');
      return bases.data;
    } catch (err) {
      return err.response.data;
    }
  }

  static async getDrones() {
    const drones = await instance.get('/drones');
    return drones.data;
  }

  static async getuUserByEmail(email: string) {
    const user = await instance.get(`/user/email/${email}`);
    return user.data;
  }

  static async getuUserByUserToken(userToken: string) {
    const user = await instance.get(`/user/email/${userToken}`);
    return user.data;
  }

  static async createNewUser(data: Inputs) {
    const user = await instance.post(`/user`, data);
    return user.data;
  }
}

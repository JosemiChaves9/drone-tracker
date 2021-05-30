import dotenv from 'dotenv';
dotenv.config();

console.log(process.env);

export class EnviromentVariables {
  static getMapAccessToken() {
    return process.env.REACT_APP_MAP_ACCESS_TOKEN || '';
  }

  static getOpencageApiKey() {
    return process.env.REACT_APP_OPENCAGE_API_KEY || '';
  }
}

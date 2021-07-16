import dotenv from 'dotenv';
dotenv.config();
const debug = require('debug')('clientEnvVar');

debug(process.env);
export class EnviromentVariables {
  static getMapAccessToken() {
    return process.env.REACT_APP_MAP_ACCESS_TOKEN || '';
  }

  static getOpencageApiKey() {
    return process.env.REACT_APP_OPENCAGE_API_KEY || '';
  }

  static getWebSocketAddress() {
    if (EnviromentVariables.getEnviroment() === 'prod') {
      return `wss://${process.env.REACT_APP_SERVER_ADDRESS}`;
    } else {
      return `ws://${process.env.REACT_APP_SERVER_ADDRESS}:${process.env.REACT_APP_PORT}`;
    }
  }

  static getServerAddress() {
    if (EnviromentVariables.getEnviroment() === 'prod') {
      return `https://${process.env.REACT_APP_SERVER_ADDRESS}`;
    } else {
      return `http://${process.env.REACT_APP_SERVER_ADDRESS}:${process.env.REACT_APP_PORT}`;
    }
  }

  static getEnviroment() {
    return process.env.REACT_APP_ENVIROMENT;
  }
}

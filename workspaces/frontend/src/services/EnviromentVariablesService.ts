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

  static getServerAddressAndPort() {
    return `http://${process.env.REACT_APP_SERVER_ADDRESS}:${process.env.REACT_APP_SERVER_PORT}`;
  }

  static getWebSocketAddressAndPort() {
    return `ws://${process.env.REACT_APP_WEBSOCKET_ADDRESS}:${process.env.REACT_APP_WEBSOCKET_PORT}`;
  }
}

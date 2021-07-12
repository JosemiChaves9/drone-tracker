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
    return `wss://${process.env.REACT_APP_SERVER_ADDRESS}`;
  }

  static getServerAddress() {
    return `https://${process.env.REACT_APP_SERVER_ADDRESS}`;
  }
}

import dotenv from 'dotenv';
dotenv.config();
var debug = require('debug')('serverEnvVar');

debug(process.env);

export class EnviromentVariables {
  static getPort() {
    return process.env.PORT || 4000;
  }

  static getPostgresUser() {
    return process.env.PGUSER || '';
  }

  static getPostgresPassword() {
    return process.env.PGPASSWORD || '';
  }

  static getPostgresDbName() {
    return process.env.PGNAME || '';
  }

  static getSecret() {
    return process.env.SECRET || '';
  }

  static getHostDb() {
    return process.env.HOST || '';
  }

  static getOpencageApiKey() {
    return process.env.OPENCAGE_API_KEY || '';
  }
}

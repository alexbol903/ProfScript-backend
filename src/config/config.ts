import dotenv from 'dotenv';
import { IConfig, IEmail, IMongoDB, IServer, TMongoOptions } from '../types/yandexModey';
dotenv.config();

/** MongoDB options */
const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  autoIndex: true,
  retryWrites: false,
} as TMongoOptions;

const MONGO_USERNAME = process.env.NODE_MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.NODE_MONGO_PASSWORD || '';
const MONGO_HOST = process.env.NODE_MONGO_HOST || '';
const MONGO_DB = process.env.NODE_MONGO_DB || '';

const MONGO = {
  host: MONGO_HOST,
  username: MONGO_USERNAME,
  password: MONGO_PASSWORD,
  options: MONGO_OPTIONS,
  url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}`,
} as IMongoDB;

/** Server options */
const SERVER_HOST = process.env.NODE_SERVER_HOST || 'localhost';
const SERVER_PORT = process.env.NODE_SERVER_PORT || 4000;

const SERVER = {
  hostname: SERVER_HOST,
  port: SERVER_PORT,
} as IServer;

/** Email options */
const FROM_MAIL = process.env.NODE_FROM_MAIL || '';
const MAIL_LOGIN = process.env.NODE_MAIL_LOGIN || '';
const MAIL_PASSWORD = process.env.NODE_MAIL_PASSWORD || '';
const SCRIPT_CLOUD_LINK = process.env.NODE_SCRIPT_CLOUD_LINK || '';

const EMAIL = {
  from: FROM_MAIL,
  login: MAIL_LOGIN,
  password: MAIL_PASSWORD,
  scriptLink: SCRIPT_CLOUD_LINK,
} as IEmail;

const config = {
  mongo: MONGO,
  server: SERVER,
  email: EMAIL,
} as IConfig;

export default config;

import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import log from './config/log';
import config from './config/config';
import mongoose from 'mongoose';
import yandexMoneyRoute from './routes/yandexMoney';

const NAMESPACE = 'Server';
const PREFIX = '/api';
const router = express();

/** Connect to Mongo */
const start = async () => {
  try {
    await mongoose.connect(config.mongo.url, config.mongo.options);
    log.info(NAMESPACE, 'Connected to MongoDB!');
  } catch (err) {
    log.error(NAMESPACE, (err as Error).message, err);
  }
};
start();

/** Logging the request */
router.use((req, res, next) => {
  log.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
    log.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${req.statusCode}]`);
  });

  next();
});

/** Parse the response */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/** Rules of our API */
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET POST PATCH PUT DELETE');
    return res.status(200).json({});
  }

  next();
});

/** Routes */
router.use(PREFIX, yandexMoneyRoute);

/** Error handling */
router.use((req, res, next) => {
  const error = new Error('not found');

  return res.status(404).json({
    message: error.message,
  });
});

/** Create the server */
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => log.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));

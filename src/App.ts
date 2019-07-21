import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import helmet from "helmet";
import mongoose from "mongoose";
import bluebird, { config } from "bluebird";
import { MONGODB_URI } from "./util/secrets";
import errorHandler from "errorhandler";
import RouteLoader from "./util/RouteLoader";
import cors from 'cors';
import logger from './util/logger';
import { MongoDBTransportInstance } from "winston-mongodb";
import appconfig from './config/config';
import fs from 'fs';
import http from 'http';
import https from 'https';
import CustomError from './errors/CustomError';
const { MongoDB }: { MongoDB: MongoDBTransportInstance } = require("winston-mongodb");


class App {
  public app: express.Application;
  public port: number;


  constructor(port: any) {
    this.app = express();
    this.port = port;
    this.initializeMiddlewares();
    this.initializeRouter();
    this.initializeLogger();
    this.initializeDatabase();
    this.initializeErrorHandling();
  }
  private initializeMiddlewares() {
    this.app.use(compression());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(errorHandler())
  }

  private initializeRouter() {
    let routeLoader = new RouteLoader(this.app);
    routeLoader.load();
  }

  private initializeDatabase() {
    const mongoUrl = MONGODB_URI;
    (<any>mongoose).Promise = bluebird;

    mongoose.connect(mongoUrl, { useNewUrlParser: true }).then(
      () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
    ).catch(err => {
      console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    });
  }

  private initializeErrorHandling() {
    process.on('uncaughtException', (err) => {
      logger.error({ "type": "uncaughtException", "message": err });
      process.exit(1) //mandatory (as per the Node docs)
    });
    process.on('unhandledRejection', error => {
      logger.error({ "type": 'unhandledRejection', "message": error });
    });

    this.app.use(
      function (
        error: CustomError,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {
        logger.error({ "type": 'unhandledError', "message": error });
        res.status(error.getStatusCode()).send(error.getMessage())
      })
  }


  private initializeLogger() {
    if (process.env.LOGGING_TYPE === "mongo") {
      let mongoOptions = {
        level: logger.level,
        "db": process.env.LOGGING_DB_URI,
        "storeHost": true,
        "label": appconfig.name
      }
      logger.add(new MongoDB(mongoOptions));
    }

    this.app.use(function (req: express.Request, res: express.Response, next) {
      logger.info({ "url": req.url, "asdfasdf": "asdfasdfa" });
    });

  }

  public listen() {
    if (process.env.HTTPS_MODE === "true") {
      let options = {
        key: fs.readFileSync(process.env.SERVER_KEY_PATH),
        cert: fs.readFileSync(process.env.SERVER_CERT_PATH)
      };
      const httpsServer = https.createServer(options, this.app);
      return httpsServer.listen(this.port, () => {
        console.log(`API running on port ${this.port}`)
        logger.info("API running on port " + this.port)
      });
    } else {
      const server = http.createServer(this.app);
      return server.listen(this.port, () => {
        console.log(`API running on port ${this.port}`)
        logger.info("API running on port " + this.port)
      });
    }

  }


}

export default App;




import http from 'http';
import express, { Application, Router, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';

import ErrorObject from '../interfaces/ErrorObject';
import { createResponse, createError } from '../utils/response';
import errors from '../utils/errors';
import Logger from './logger';

class Server {

  app: Application;
  private routes: string[];
  private httpServer: http.Server;

  constructor() {
    this.app = express();
    this.routes = [];

    if (!process.env.JEST_WORKER_ID) {
      this.initDB();
      this.config();
    }
  }

  private initDB(): void {
    mongoose.connect(process.env.APP_DB_PATH);

    mongoose.connection.on('error', error => {
      Logger.log('error', 'Database error', error);
    });
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(cors());
    this.app.use(morgan('dev'));
  }

  public addRoute(url: string, handler: Router): void {
    if (this.routes.indexOf(url) === -1) {
      this.routes.push(url);
      this.app.use(`/api/${ process.env.APP_VERSION }${ url }`, handler);
    }
  }

  public start(): void {
    this.errorHandling();

    this.httpServer = http.createServer(this.app);
    this.httpServer.listen(process.env.APP_LISTEN_PORT);
  }

  errorHandling(): void {
    // 404
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      next(createError(errors.not_found));
    });

    this.app.use((err: ErrorObject, req: Request, res: Response, next: NextFunction) => {
      if (res.headersSent) {
        return next(err);
      }

      createResponse(res, err.status, err.code, err.message);
    });
  }

}

export default Server;

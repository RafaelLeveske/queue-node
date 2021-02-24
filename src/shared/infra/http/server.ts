import dotenv from 'dotenv';

dotenv.config();

import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';
import AppError from '@shared/errors/AppError';
import routes from './routes';
import '@shared/infra/mongoose';
import '@shared/container';

const app = express();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],

  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(Sentry.Handlers.errorHandler());

app.use(function onError(
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
) {
  response.statusCode = 500;
  response.end(`${err.message}\n`);
});

app.use(errors());
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(process.env.APP_PORT || 3333, () => {
  console.log('Server online on port 3333');
});

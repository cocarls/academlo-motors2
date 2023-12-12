import express from 'express';
import { router } from './routes/index.js';
import { AppError } from './common/errors/appErrors.js';
import { globalErrorHandler } from './common/errors/error.controller.js';
import morgan from 'morgan';
import { envs } from './config/enviroments/enviroments.js';
import { enableCors } from './config/plugins/cors.plugin.js';

const app = express();
const ACCEPTED_ORIGINS = []

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

enableCors(app, ACCEPTED_ORIGINS)


if(envs.NODE_ENV === 'development'){
    app.use(morgan('dev'));
    console.log('me estoy ejecutando en desarrollo');
}

if(envs.NODE_ENV === 'production'){
    console.log('me estoy ejecutando en produccion');
}

//rutas
app.use('/api/v1', router);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

export default app;

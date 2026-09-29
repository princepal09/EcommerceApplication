import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { CLIENT_URL } from './config/env.config.js';
import { pinoHttp } from 'pino-http';
import { logger } from './lib/logger.js';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/error.middleware.js';
import authRoute from './modules/auth/auth.route.js';
import categoryRoute from './modules/category/category.route.js';
import productRoute from './modules/product/product.route.js';

const app: Express = express();

// HTTP logging
app.use(
  pinoHttp({
    logger,

    serializers: {
      req: (req) => ({
        method: req.method,
        url: req.url,
      }),

      res: (res) => ({
        statusCode: res.statusCode,
      }),
    },
  }),
);

// Security
app.use(helmet());
app.use(
  cors({
    origin: CLIENT_URL ?? '',
    credentials: true,
  }),
);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  }),
);
app.use(cookieParser());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/product', productRoute);

// Health check
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'E-commerce API is running',
    timestamp: new Date().toISOString(),
  });
});

app.use(errorMiddleware);

export default app;

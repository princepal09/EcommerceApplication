
import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { CLIENT_URL } from './config/config.js';

const app: Express = express();

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

// Health check
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'E-commerce API is running',
    timestamp: new Date().toISOString(),
  });
});


export default app;

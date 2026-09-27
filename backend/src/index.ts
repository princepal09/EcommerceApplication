import 'reflect-metadata';

import app from './app.js';

import { PORT } from './config/env.config.js';
import { logger } from './lib/logger.js';

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error(
      {
        err: error,
      },
      'Failed to start server:',
    );
    process.exit(1);
  }
};

startServer();

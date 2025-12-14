import app from './app';
import { config } from './config';
import logger from './utils/logger';
import fs from 'fs';
import path from 'path';

// Ensure logs directory exists
const logsDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const server = app.listen(config.port, () => {
  logger.info(`🚀 Server is running on port ${config.port}`);
  logger.info(`📚 API Documentation available at http://localhost:${config.port}/api-docs`);
  logger.info(`💚 Health check available at http://localhost:${config.port}/health`);
  logger.info(`🌍 Environment: ${config.nodeEnv}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

export default server;

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const { loggerMiddleware } = require('./assetflow-backend/src/middleware/logger.middleware');
const { errorMiddleware } = require('./assetflow-backend/src/middleware/error.middleware');
const { validatorMiddleware } = require('./assetflow-backend/src/middleware/validator.middleware');

const routes = require('./assetflow-backend/src/routes');
const env = require('./assetflow-backend/src/config/env');

function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.cors.origin, credentials: true }));
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(loggerMiddleware());

  // Global validation errors handler
  app.use(validatorMiddleware);

  app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
  app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🚀 AssetFlow Backend API is running',
    version: '1.0.0'
  });
});
  app.use('/api', routes);
  
  // Central error handler
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => errorMiddleware(err, req, res, next));

  return app;
}

module.exports = { createApp };


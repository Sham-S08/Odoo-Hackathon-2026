const { createApp } = require('./app.js');
const { connectDB } = require('./assetflow-backend/src/config/db.js');
const env = require('./assetflow-backend/src/config/env.js');

async function start() {
  await connectDB();

  const app = createApp();
  app.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`AssetFlow backend running on port ${env.port}`);
  });
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start server:', err);
  process.exit(1);
});


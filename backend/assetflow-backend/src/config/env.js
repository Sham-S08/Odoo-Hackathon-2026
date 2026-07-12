const dotenv = require('dotenv');

dotenv.config();

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,

  mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/assetflow',


  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'dev_access_secret_change_me',
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '7d'
  },


  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || 'replace_me',
    apiKey: process.env.CLOUDINARY_API_KEY || 'replace_me',
    apiSecret: process.env.CLOUDINARY_API_SECRET || 'replace_me'
  },


  upload: {
    maxSizeMB: Number(process.env.UPLOAD_MAX_SIZE_MB || 10)
  },

  ai: {
    maintenanceInsightsUrl: process.env.AI_MAINTENANCE_INSIGHTS_URL || 'http://127.0.0.1:8000/api/ai/maintenance-insights'
  },


  cors: {
    origin: process.env.CORS_ORIGIN || '*'
  }
};


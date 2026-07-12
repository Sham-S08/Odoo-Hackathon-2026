const jwt = require('jsonwebtoken');
const env = require('./env');

function signAccessToken(payload) {
  return jwt.sign(payload, env.jwt.accessSecret, {
    expiresIn: env.jwt.accessExpiresIn
  });
}

function verifyAccessToken(token) {
  return jwt.verify(token, env.jwt.accessSecret);
}

module.exports = { signAccessToken, verifyAccessToken };


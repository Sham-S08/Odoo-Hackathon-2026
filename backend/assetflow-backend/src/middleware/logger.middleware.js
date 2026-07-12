const morgan = require('morgan');

function loggerMiddleware() {
  return morgan('combined');
}

module.exports = { loggerMiddleware };


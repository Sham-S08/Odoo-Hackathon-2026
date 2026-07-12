const { verifyAccessToken } = require('../config/jwt');

function authMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing or invalid Authorization header' });
    }

    const token = header.slice('Bearer '.length);
    const decoded = verifyAccessToken(token);

    // decoded is expected to contain employeeId and role
    req.user = {
      id: decoded.employeeId,
      role: decoded.role
    };

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = { authMiddleware };


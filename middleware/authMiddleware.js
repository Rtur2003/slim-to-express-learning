const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

module.exports = function authMiddleware(req, res, next) {
  // Authorization: Bearer <token>
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing.' });
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Token gerekli.' });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    return next();
  } catch (err) {
    return res.status(403).json({ message: 'Token geçersiz.' });
  }
};

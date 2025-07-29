const authService = require('../services/authService');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    const decoded = authService.verifyToken(token);
    if (!decoded || !decoded.user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
    
    req.user = {
      userId: decoded.user.id
    };
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;

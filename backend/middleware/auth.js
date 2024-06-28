const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')

  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, '05ba7ae8df02e52a18ec9c90d471492ae6d8d23547fafbc3c8dc8d3ecef37bd5');
    req.user = await User.findById(decoded._id);
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

const adminMiddleware = (req, res, next) => {
  // Memeriksa role dari objek request yang sudah disimpan oleh authMiddleware
  if (req.user && req.user.role === 1) { // Misalnya, role 1 adalah role admin
    next(); // Lanjutkan ke rute admin
  } else {
    res.status(403).json({ message: 'Forbidden, admin access required' });
  }
};

module.exports = { authMiddleware, adminMiddleware };
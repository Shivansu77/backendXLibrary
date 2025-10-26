const jwt = require('jsonwebtoken');
const User = require('../models/user');
const secret = process.env.CS_SECRET_KEY || 'CS_SECRET_KEY';

const librarianMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ msg: 'Authorization header missing' });
    }

    // Format: "Bearer <jwt>"
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ msg: 'Token format should be: Bearer <token>' });
    }

    const token = parts[1];
    const decoded = jwt.verify(token, secret);

    // The payload must include a unique property you can look up, usually _id or email
    // Update this based on your token's payload structure
    const user = await User.findOne({ _id: decoded._id || decoded.id || decoded.userId });
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }
    if (!user.isActive) {
      return res.status(401).json({ msg: "User not active" });
    }
    if (user.role !== "librarian") {
      return res.status(403).json({ msg: "You are not authorized as a librarian" });
    }
    req.user = user; // Attach user if you want later access in route code
    next();
  } catch (err) {
    res.status(403).json({ msg: "Authentication failed" });
  }
};

module.exports = librarianMiddleware;

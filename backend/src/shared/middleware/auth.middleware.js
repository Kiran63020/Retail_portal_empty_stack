const jwt = require("jsonwebtoken");
const path = require("path");

// Use the existing auth model (User)
const User = require(
  path.join(__dirname, "../../services/auth/auth.model")
);


// Protect routes (JWT required)
const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Admin-only access
const admin = (req, res, next) => {
  if (req.user && req.user.role === "ADMIN") {
    next();
  } else {
    res.status(403).json({ message: "Admin access only" });
  }
};

// For backward compatibility with older code using `authenticate`
const authenticate = protect;

// Named exports
module.exports = {
  protect,
  admin,
  authenticate,
};

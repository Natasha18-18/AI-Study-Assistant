const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 🔹 Check if header exists & format is correct
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    // 🔹 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔹 Check if user exists in DB
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // 🔹 Attach full user object
    req.user = user;

    next();

  } catch (err) {
    console.error("Auth Error:", err.message);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;
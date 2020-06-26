const jwt = require("jsonwebtoken");
const { SECRET_TOKEN } = require("../config");

const validateToken = async (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) return res.status(401).json({ error: "Access denied." });

    await jwt.verify(token, SECRET_TOKEN, (error) => {
      if (error) return res.status(403).json({ error: "Token expired" });
      next();
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  validateToken,
};

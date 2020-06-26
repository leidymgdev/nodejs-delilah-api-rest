const jwt = require("jsonwebtoken");
const { SECRET_TOKEN, ADMIN_USER_ID } = require("../config");

const validateToken = async (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) return res.status(401).json({ error: "Access denied." });

    await jwt.verify(token, SECRET_TOKEN, (error, data) => {
      if (error) return res.status(403).json({ error: "Token expired" });
      req.body = {
        ...req.body,
        userId: data.id,
        userTypeId: data.userTypeId,  
      };
      next();
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const validateAdminPermissions = (req, res, next) => {
  try {
    if (req.body.userTypeId !== ADMIN_USER_ID)
      return res.status(401).json({ error: "Access denied." });
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  validateToken,
  validateAdminPermissions,
};

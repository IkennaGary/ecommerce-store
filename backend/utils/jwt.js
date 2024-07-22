const jwt = require("jsonwebtoken");

const createJwt = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );

  return token;
};

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = { createJwt, isTokenValid };

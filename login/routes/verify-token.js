const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('authorization');
  if (!token) return res.status(401).send('Access Denied');

  try {
    req.user = jwt.varified(token, process.env.TOKEN_SECRET);
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};

module.exports = verifyToken;

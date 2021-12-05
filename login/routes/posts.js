const router = require('express').Router();
const verifyToken = require('./verify-token');

// verifyToken middleward를 middle param에 추가해주면 끗
router.get('/', verifyToken, (req, res) => {
  res.json({
    posts: {title: 'title', content: 'random data you shouldnt access'},
  });
});

module.exports = router;

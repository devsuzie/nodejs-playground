const router = require('express').Router();

router.get('/sports', (req, res) => {
  res.send('Sports board');
});

router.get('/game', (req, res) => {
  res.send('Game board');
});

module.exports = router;

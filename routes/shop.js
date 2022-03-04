const router = require('express').Router();

const isSignedInUser = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.send('Sign In needed');
  }
};

// middleware for the file
router.use(isSignedInUser);

router.get('/shirts', (req, res) => {
  res.send('Shirts page');
});

router.get('/pants', (req, res) => {
  res.send('Pants page');
});

module.exports = router;

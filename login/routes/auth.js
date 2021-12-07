const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../model/User');
const {signupValidation, loginValidation} = require('../utils/validation');
const {encrypt, decrypt} = require('../utils/crypto');

router.post('/signup', async (req, res) => {
  const {error} = signupValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const isExistUser = await User.findOne({id: req.body.id});
  if (isExistUser) return res.status(400).send('Id already exists');

  const user = new User({
    id: req.body.id,
    password: encrypt(req.body.password),
  });

  try {
    const savedUser = await user.save();
    res.redirect('/login');
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  const {error} = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({id: req.body.id});
  if (!user) return res.status(400).send('User not found');

  const validPassword = req.body.password === decrypt(user.password);
  if (!validPassword) return res.status(400).send('Invalid password');

  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  res.header('authorization', token).send('Log In Successful');
});

module.exports = router;

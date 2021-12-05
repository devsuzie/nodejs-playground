const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../model/User');
const {signupValidation, loginValidation} = require('../utils/validation');
const {encrypt, decrypt} = require('../utils/crypto');

router.post('signup', async (req, res) => {
  const {error} = singupValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const idExist = await User.findOne({id: req.body.id});
  if (idExist) return res.status(400).send('Id already exists');

  const user = new User({
    id: req.body.id,
    password: encrypt(req.body.password),
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('login', async (req, res) => {
  const {error} = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({id: req.body.id});
  // here we checking user's id is exist or not in our db
  if (!user) return res.status(400).send('Id is not found');

  const validPassword = (await user.password) === decrypt(req.body.password);
  if (!validPasword) return res.status(400).send('Invalid password');

  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  res.header('authorization', token).send(token);
});

module.exports = router;

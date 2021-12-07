const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const {encrypt, decrypt} = require('./utils/crypto');

dotenv.config();

// DB connection
// useNewUrlParser: Flag for using new URL string parser instead of current (deprecated) one.
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true}, () => {
  console.log('connected to db');
});

// Middleware
// app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

// Render Pages
app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/pages/signup.html');
});
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/pages/login.html');
});

app.listen(8080, () => console.log('listening on 8080'));

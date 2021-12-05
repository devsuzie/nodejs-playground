const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const {encrypt, decrypt} = require('./utils/crypto');

dotenv.config();

// DB connection
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true}, () => {
  console.log('connected to db');
});

// Middleware
app.use(express.json());
// Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(8080, () => console.log('listening on 8080'));

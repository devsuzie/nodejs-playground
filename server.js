const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

// POST 요청으로 서버에 데이터 전송하고 싶으면 body-parser 사용해야 함
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.use(methodOverride('_method'));

let db;
MongoClient.connect(process.env.DB_URL, (error, client) => {
  if (error) return console.log(error);

  db = client.db('todoapp');
  app.listen('8080', () => {
    console.log('listening on 8080');
  });
});

app.get('/pet', (req, res) => {
  res.send('pet page');
});

app.get('/beauty', (req, res) => {
  res.send('beauty page');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/write', (req, res) => {
  res.sendFile(__dirname + '/write.html');
});

app.post('/add', (req, res) => {
  res.send('전송 완료');

  db.collection('counter').findOne({name: '게시물갯수'}, (error, result) => {
    const {totalPost} = result;

    db.collection('post').insertOne(
      {_id: totalPost + 1, title: req.body.title, date: req.body.date},
      (error, result) => {
        console.log('저장 완료');
        db.collection('counter').updateOne(
          {name: '게시물갯수'},
          {$inc: {totalPost: 1}},
          (error, result) => {
            if (error) return console.log(error);
          },
        );
      },
    );
  });
});

app.get('/list', (req, res) => {
  db.collection('post')
    .find()
    .toArray((error, result) => {
      res.render('list.ejs', {
        posts: result,
      });
    });
});

app.delete('/delete', (req, res) => {
  req.body._id = parseInt(req.body._id);
  db.collection('post').deleteOne(req.body, (error, result) => {
    result.status(200).send({
      message: 'delete success',
    });
  });
});

app.get('/detail/:id', (req, res) => {
  db.collection('post').findOne(
    {_id: parseInt(req.params.id)},
    (error, result) => {
      res.render('detail.ejs', {data: result});

      if (!result) {
        res.send('page not found');
      }
    },
  );
});

app.get('/edit/:id', (req, res) => {
  db.collection('post').findOne(
    {_id: parseInt(req.params.id)},
    (error, result) => {
      res.render('edit.ejs', {post: result});
    },
  );
});

app.put('/edit', (req, res) => {
  db.collection('post').updateOne(
    {_id: parseInt(req.body.id)},
    {$set: {title: req.body.title, date: req.body.date}},
    (error, result) => {
      console.log('edit success');
      res.redirect('/list');
    },
  );
});

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(
  session({secret: 'SECRETE_CODE', resave: true, saveUninitialized: false}),
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/fail',
  }),
  (req, res) => {
    res.redirect('/');
  },
);

const isSignedInUser = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.send('Sign In needed');
  }
};

app.get('/mypage', isSignedInUser, (req, res) => {
  res.render('mypage.ejs', {user: req.user});
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'id',
      passwordField: 'password',
      session: true,
      passReqToCallback: false,
    },
    (id, password, done) => {
      db.collection('login').findOne({id}, function (error, result) {
        if (error) return done(error);

        if (!result) return done(null, false, {message: 'id does not exist'});
        if (password === result.password) {
          return done(null, result);
        } else {
          return done(null, false, {message: 'Password Incorrect'});
        }
      });
    },
  ),
);

// session 저장 (로그인 성공시)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// user session id로 개인정보를 DB에서 찾아옴 (mypage 접속시)
passport.deserializeUser((id, done) => {
  db.collection('login').findOne({id: id}, (error, result) => {
    done(null, result);
  });
});

app.get('/search', (req, res) => {
  const searchCondition = [
    {
      $search: {
        index: 'titleSearch',
        text: {
          query: req.query.value,
          path: 'title',
        },
      },
    },
    {$sort: {_id: 1}},
    {$limit: 10},
  ];

  db.collection('post')
    .aggregate(searchCondition)
    .toArray((error, result) => {
      res.render('search.ejs', {posts: result});
    });
});

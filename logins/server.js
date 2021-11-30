const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))

const MongoClient = require('mongodb').MongoClient
app.set('view engine', 'ejs')

let db
MongoClient.connect(
  'mongodb+srv://suzie:ZDW6qvg!xdt-yut3ygw@cluster0.dvvbl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  (error, client) => {
    db = client.db('todoapp')
    app.listen('8080', () => {
      console.log('listening on 8080')
    })
  },
)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/login', (req, res) => {
  res.send('암호화된 로그인 정보를 DB에 저장했습니다.')
  console.log(req.body)

  db.collection('post').insertOne(
    {id: req.body.id, password: req.body.password},
    (error, result) => {
      console.log('저장 완료')
    },
  )
})

app.get('/list', (req, res) => {
  db.collection('post')
    .find()
    .toArray((error, result) => {
      console.log(result)
      res.render('list.ejs', {
        result,
      })
    })
})

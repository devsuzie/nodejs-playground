const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// POST 요청으로 서버에 데이터 전송하고 싶으면 body-parser 사용해야 함
app.use(bodyParser.urlencoded({extended: true}))

const MongoClient = require('mongodb').MongoClient

let db
MongoClient.connect(
  'mongodb+srv://suzie:ZDW6qvg!xdt-yut3ygw@cluster0.dvvbl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  (error, client) => {
    if (error) return console.log(error)

    // todoapp 이라는 database (폴더)에 연결
    db = client.db('todoapp')

    db.collection('post').insertOne(
      {_id: 1, name: 'suzie', age: 24},
      (error, result) => {
        console.log('저장 완료')
      },
    )

    app.listen('8080', () => {
      console.log('listening on 8080')
    })
  },
)

app.get('/pet', (req, res) => {
  res.send('pet page')
})

app.get('/beauty', (req, res) => {
  res.send('beauty page')
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/write', (req, res) => {
  res.sendFile(__dirname + '/write.html')
})

app.post('/add', (req, res) => {
  res.send('전송 완료')

  // db = client.db('todoapp')
  // db.collection('post').insertOne(
  //   {_id: 1, title: req.body.title, date: req.body.date},
  //   (error, result) => {
  //     console.log('저장 완료')
  //   },
  // )
})

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// POST 요청으로 서버에 데이터 전송하고 싶으면 body-parser 사용해야 함
app.use(bodyParser.urlencoded({extended: true}))

app.listen(8080, function () {
  console.log('listening on 8080')
})

app.get('/pet', function (req, res) {
  res.send('pet page')
})

app.get('/beauty', function (req, res) {
  res.send('beauty page')
})

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.get('/write', function (req, res) {
  res.sendFile(__dirname + '/write.html')
})

app.post('/add', function (req, res) {
  res.send('전송 완료')
  console.log(req.body)
})

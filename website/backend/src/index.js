import express from 'express'
import bodyParser from 'body-parser'
import mysql from 'promise-mysql'
const settings = {
  host: 'localhost',
  user: 'root',
  password: 's7pXORZ123',
  database: 'smackdown'
}

const QUERY_TOP = `SELECT * FROM smackdown.posts WHERE flag is null ORDER BY RAND() LIMIT 5`
const QUERY_ONE = `SELECT * FROM smackdown.posts WHERE flag is null ORDER BY RAND() LIMIT 1`
const QUERY_UPDATE = `UPDATE smackdown.posts SET flag = {flag} WHERE id = {id}`

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.get('/posts/top', (req, res) => {
  mysql.createConnection(settings)
    .then((conn) => {
      const result = conn.query(QUERY_TOP)
      conn.end()
      return result
    }).then((rows) => {
      res.send(rows)
    })
})

app.get('/posts/one', (req, res) => {
  mysql.createConnection(settings)
    .then((conn) => {
      const result = conn.query(QUERY_ONE)
      conn.end()
      return result
    }).then((rows) => {
      res.send(rows)
    })
})

app.put('/posts/:id', (req, res) => {
  mysql.createConnection(settings)
    .then((conn) => {
      conn.query(QUERY_UPDATE
        .replace('{id}', req.body.id)
        .replace('{flag}', req.body.flag))
      conn.end()
    }).then((rows) => {
      res.send()
    })
})

const server = app.listen(3001, () => {
  console.log('Server running at http://localhost:' + server.address().port)
})

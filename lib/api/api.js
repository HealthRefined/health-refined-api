const express = require('express')
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const logger = require('./../logger')

let app = express()
app.disable('etag')
app.use(cors())
app.use(morgan('dev', { stream: logger.stream }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, './../../public')))
app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  res.header('Expires', '-1')
  res.header('Pragma', 'no-cache')
  next()
})

// const documents = require('./routes/documents')
app.use('/health', (req, res, next) => {
  res.json({
    health: 'good'
  })
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  let response = {
    message: err.message,
    err: req.app.get('env') === 'development' ? err : {},
    status: err.status || 500
  }
  // render the error page
  res.status(err.status || 500)
  res.json(response)
})

module.exports = app

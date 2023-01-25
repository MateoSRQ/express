var express = require('express')
var morgan = require('morgan')
var path = require('path')
var pico = require('pico')
var rfs = require('rotating-file-stream') // version 2.x
 
var app = express()

console.log(process.env)

const port = process.env.SERVER_PORT | 3000
 
// create a rotating write stream
var accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})
 
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))
 
app.get('/', function (req, res) {
  res.send('hello, world!')
})

app.listen(port);
console.log('Node + Express REST API skeleton server started on port: ' + port);

module.exports = app;
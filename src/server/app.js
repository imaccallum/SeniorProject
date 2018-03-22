const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

import winston from 'winston'
import expressWinston from 'express-winston'
import morgan from 'morgan'

const router = require('./router')

const app = express();

app.use(morgan('tiny'));


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log('REQUEST')
  console.log(req.body)
  next()
})


app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ]
}))

// Now we can tell the app to use our routing code:
app.use(router)


// express-winston errorLogger makes sense AFTER the router.
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ]
}));






module.exports = app
const http = require('http');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const setupApplicationApi = require('./middlewares/api');
const logger = require('./logger');

process.env.APP_PORT = process.env.APP_PORT || 8080;
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();

app.use(logger.expressMiddleware);
app.use(bodyParser.json());
//establish server session for 24 hrs
app.use(session({resave: true, saveUninitialized: true, secret: 'SOMERANDOMSECRETHERE', cookie: { maxAge: 86400000 }}));

// apply application API
setupApplicationApi(app);

// middlewares
if (process.env.NODE_ENV === 'development') {
  require('./middlewares/development')(app);
} else {
  require('./middlewares/production')(app);
}

http.createServer(app).listen(process.env.APP_PORT, () => {
  logger.info(`HTTP server is now running on http://localhost:${process.env.APP_PORT}`);
});

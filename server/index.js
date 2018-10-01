const express = require('express');
const GraphHTTP = require('express-graphql');
const bodyParser = require('body-parser');
const Schema = require('./src/schema').default;
const mongoose = require('mongoose');

const APP_PORT = 4000;
const app = express();

mongoose
  .connect('mongodb://localhost:27017/ih-coding-challenge', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!'); // eslint-disable-line no-console
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err); // eslint-disable-line no-console
  });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.end();
  }
  next();
});

app.use(
  '/graphql',
  GraphHTTP({
    schema: Schema,
    graphiql: true,
  }),
);

app.listen(APP_PORT, () => {
  console.log(`App listening on port ${APP_PORT}`); // eslint-disable-line no-console
});

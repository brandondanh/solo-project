const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const bodyParser = require('body-parser');
const app = express();
var TodoList = require('./model/todo_items.js');
// const clientID = '527537863008-flme5djut1vemv8mqdaorjh3b9cm4qlb.apps.googleusercontent.com';
// const clientSecret = '33A_eLY3LBSSqQYAzx19tPLf';

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://admin:password@ds115045.mlab.com:15045/todo';
mongoose.connect(mongoDB, {
  useMongoClient: true
});
var db = mongoose.connection;
db.on('connected', function () { console.log('Mongoose default connection open to ' + 'mlab');}); 
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

app.use(express.static(__dirname + '/www'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/auth', (req, res) => {
  res.render('./../src/login');
});

app.get('/api/notes/:user', (req, res) => {
  // TodoList.create({ user: 'Brandon', notes: ['Sleep'] }, function (err, created) {
  //   if (err) return handleError(err);
  //   else console.log('created');
  // })
  // console.log(req.params.user);
  TodoList.findOne({user: 'Brandon'}, function (err, docs) {
    // console.log(docs);
    res.send(docs);
  });
});

app.post('/api/notes/:user', (req, res) => {
  console.log('body', req.body);
  TodoList.findOne({user: req.params.user}, function (err, list) {
    if (err) return res.send(err);
    if (!list) return;

    list.notes.push((req.body.todo));
    list.save(function (err, newList) {
      if (err) return res.send(err);
      return res.send(newList);
    });
  });
});

app.post('/api/notes/update/:user', (req, res) => {
  TodoList.findOne({user: req.params.user}, function (err, list) {
    if (err) return res.send(err);
    if (!list) return;

    list.notes = req.body.todo;
    list.save(function (err, newList) {
      if (err) return res.send(err);
      return res.send(newList);
    });
  });
});

app.post('/api/weather/:user', (req, res) => {
  TodoList.findOne({user: req.params.user}, function (err, user) {
    if (err) return res.send(err);
    if (!user) return;
    user.zip = req.body.zip;
    user.save(function (err, newList) {
      if (err) return res.send(err);
        return res.send(newList);
    });
  });
});
  


const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

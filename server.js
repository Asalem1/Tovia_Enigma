const bodyParser = require('body-parser');
const express = require('express');
const mongojs = require('mongojs');
const path = require('path');
const bcrypt = require('bcrypt-nodejs')

const app = express();
const port = process.env.PORT || 3000
const db = mongojs('messages', ['messages']);

// Setup View Engine
app.set('views', path.join(__dirname,  'views'));
app.set('view engine', 'ejs');

// Allows us to render html files
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(__dirname));

// Set our bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set our Routes
app.get('/', (req, res, next) => {
  res.render('index.html');
});

app.get('/:id', (req, res, next) => {
  res.render('index.html');
})

app.get('/api/encrypt/:id', (req, res, next) => {
  let hash = req.params.id;
  let encrypted = req.query.message;
  let returnedObject = {
    message: 'Sorry, this message no longer exists'
  }
  db.messages.find({hash: hash, encrypted: encrypted}, (err, result) => {
    if (err) {
      res.send(returnedObject);
    }
    if (result[0].expirationTime - Date.now() >= 0) {
      returnedObject = {
        expirationDate: result[0].expirationDate,
        message: result[0].message,
      }
    }
    res.send(returnedObject);
  });
});

app.post('/api/encrypt/:id', (req, res, next) => {
  let { message, expirationTime, expirationDate } = req.body;
  let hash = req.params.id
  let encrypted = bcrypt.hashSync(message);
  let savedInfo = {
    message: message,
    encrypted: encrypted,
    hash: hash,
    expirationTime: expirationTime,
    expirationDate: expirationDate,
  }
  if (!savedInfo) {
    res.status(404);
    res.json({
      error: 'information is invalid'
    });
  } else {
    db.messages.save(savedInfo, (err, message) => {
      if (err) {
        res.status(404);
        res.send(err);
      }
      res.json(encrypted);
    });
  }
});

app.listen(process.env.PORT || port, () => {
  console.log('the server is connected to port: ', port);
})

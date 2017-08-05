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

app.get('/api/encrypt', (req, res, next) => {
  db.messages.find((err, messages) => {
    if (err) {
      res.status(404);
      res.send(err);
    }
    res.send(messages);
  });
});

app.post('/api/encrypt', (req, res, next) => {
  let { message, hash, expiration } = req.body;
  let encrypted = bcrypt.hashSync(message);
  // post message and expiration date
  let savedInfo = {
    message: message,
    hash: expiration,
    expiration: expiration
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

// initialize: function() {
//   this.on('creating', this.hashPassword);
// },
// comparePassword: function(attemptedPassword, callback) {
//   bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//     callback(isMatch);
//   });
// },
// hashPassword: function() {
//   var cipher = Promise.promisify(bcrypt.hash);
//   return cipher(this.get('password'), null, null).bind(this)
//     .then(function(hash) {
//       this.set('password', hash);
//     });
// }


app.listen(process.env.PORT || port, () => {
  console.log('the server is connected to port: ', port);
})

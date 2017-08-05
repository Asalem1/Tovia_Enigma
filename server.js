const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongojs = require('mongojs');
const db = mongojs('messages', ['messages']);

const app = express();
const port = process.env.PORT || 3000

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
  let message = req.body;
  // post message and expiration date
  if (!message) {
    res.status(404);
    res.json({
      error: 'information is invalid'
    });
  } else {
    db.messages.save(message, (err, message) => {
      if (err) {
        res.status(404);
        res.send(err);
      }
      res.json(message);
    });
  }
});


app.listen(process.env.PORT || port, () => {
  console.log('the server is connected to port: ', port);
})

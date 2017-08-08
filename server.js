const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const crypto = require('crypto')
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

app.get('/:id', (req, res, next) => {
  res.render('index.html');
})

const encrypt = (message, hash) => {
  let cipher = crypto.createCipher('aes-256-ctr', hash);
  let crypted = cipher.update(message, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

const decrypt = (message, hash) => {
  let decipher = crypto.createDecipher('aes-256-ctr', hash);
  let dec = decipher.update(message, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec
}

app.get('/api/encrypt/:id', (req, res, next) => {
  let hash = req.params.id;
  let messageToDecrypt = req.query.message;
  let decrypted = decrypt(messageToDecrypt, hash);
  decrypted = decrypted.split('|');
  let returnObj = {
    message: decrypted[0],
    expirationDate: decrypted[1],
    expirationTime: decrypted[2],
  }
  console.log('here is decrypted: ', returnObj);
  if (!decrypted) {
      res.status(404);
      res.json({
        error: 'information is invalid'
      });
    } else {
      if (returnObj.expirationTime - Date.now() >= 0) {
        console.log('here is the date')
        res.send(returnObj);
      } else {
        res.send('information is invalid');
      }
    }
});

app.post('/api/encrypt/:id', (req, res, next) => {
  let { message, expirationTime, expirationDate } = req.body;
  let hash = req.params.id
  let messageToEncrypt = message + '|' + expirationDate + '|' + expirationTime;
  let encrypted = encrypt(messageToEncrypt, hash);
  if (!encrypted) {
    res.status(404);
    res.json({
      error: 'information is invalid'
    });
  } else {
    res.json(encrypted);
  }
});

app.listen(process.env.PORT || port, () => {
  console.log('the server is connected to port: ', port);
})

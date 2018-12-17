require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const exec = require('child_process').exec;

const app = express();
const port = process.env.PORT;

app.use(session({
    secret: '#!#!#SESSIONID#!#!#',
    resave: false,
    saveUninitialized: true
   }));

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(req.method + " " + req.url)
  next()
});

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));

app.use('/git', (req, res) => {
  exec("./update.sh", (stderr, stdout, stdin)=>{
    res.send(stdout);
  });
});
app.use('/', require('./routes/test'));
app.use('/accounts', require('./routes/accounts'));
app.use('/travelstop', require('./routes/travelstop'));
app.use('/board', require('./routes/board'));

app.listen(port, () => console.log(`Server listening on port ${port}`));

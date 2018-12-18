const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const Accounts = require('./models/accounts');

const JUtil = require("./util");
const JToken = require("./jtoken")

const app = express();
const port = 8080;

app.use(express.static('public'));

app.use(cookieParser())

app.use(function (req, res, next) {

    console.log(req.cookies)

    req.tokenSet = JToken.set;
    req.tokenGet = JToken.get;

    if (req.cookies.hacker === undefined) {
        var key = Math.random().toString();
        key = key.substring(2, key.length);
        key += Date.now();
        key = JUtil.passwordHash(key);
        res.cookie('hacker', key, { maxAge: 900000, httpOnly: true });
        console.log('cookie created successfully', key);
        req.token = key;
    }
    else {
        console.log('cookie exists', req.cookies.hacker);
        req.token = req.cookies.hacker;
    }

    next();

});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(req.method + " " + req.url)
    next()
});

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/HackersDiary", {useNewUrlParser: true})
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));

app.use('/accounts', require('./routes/accounts'));
app.use('/rss', require('./routes/rss'));

app.listen(port, () => console.log(`Server listening on port ${port}`));

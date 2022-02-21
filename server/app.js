require('./config/config');
require('./model/db');

const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const rtsIndex = require('./routes/index.router');

var app = express();

app.use(bodyparser.json());
app.options("*",cors());
app.use('/api', rtsIndex);

// app.use((err, req, res, next) => {
//     if (err.name === 'ValidationError') {
//         var varErrors = [];
//         Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
//         res.status(422).send(valErrors)
//     }
// });

var whitelist = ['http://localhost:4200', 'http://localhost:3000'];
var allowCrossDomain = function (req, res, next) {
    console.log('allowCrossDomain', req.originalUrl);
    var origin = req.headers.origin;
    console.log(origin, whitelist.indexOf(origin));
    var filterData = whitelist.filter(x => x == origin);
    if (filterData.length > 0) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    // res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Headers', 'Content-Type, appToken');
    res.header('X-Frame-Options', 'sameorigin');
    res.header("Content-Security-Policy", "frame-ancestors 'self';");
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }
};
app.use(allowCrossDomain);

app.listen(process.env.PORT, () => console.log(`serve started at port: ${process.env.PORT}`));





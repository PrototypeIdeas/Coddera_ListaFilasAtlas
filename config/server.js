var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var cors = require('cors')

var corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
  
var app = express();

app.use(express.static('./app/public'));
app.use(bodyParser.json({limit: "50mb",extended: true,  parameterLimit:50000}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './app/views');

//app.use(bodyParser.urlencoded({extended:true}));
app.use(expressValidator());
app.use(cors(corsOptions));

consign()
    .include('./app/routes')
    .into(app);

module.exports = app;
var express = require('express');
var bodyParser = require('body-parser');
var router = require('./app/routes/routes.js');
var app = express();

// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use("/", router);

app.listen(3000, function () {
    console.log("Running...")
});

module.exports = app;
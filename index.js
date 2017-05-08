var express = require('express');
var bodyParser = require('body-parser');
var auth = require('./app/auth/auth.js')();
var router = require('./app/routes/routes.js')
var app = express();

// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json())
app.use(auth.initialize());

app.get("/", router);
app.get("/user", auth.authenticate(), router);
app.post('/login', router);

app.listen(3000, function () {
    console.log("Running...")
});

module.exports = app;
var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
var auth = require('./auth.js')();
var users = require('./users.js');
var cfg = require('./config.js');
var app = express();

//for testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
  extended: true
}));

// parse application/json
app.use(bodyParser.json())
app.use(auth.initialize());

app.get("/", function (req, res) {
    res.json({ status: "Express is up!" });
});

app.get("/user", auth.authenticate(), function(req, res) {
 res.json(users.getUser(req.user.id));
});


app.post('/login', function (req, res) {
  if (req.body.email && req.body.password) {
    var email = req.body.email;
    var password = req.body.password;
  }
  var user = users.findUser(email, password);

  if (user) {
    var payload = { id: user.id };
    var token = jwt.encode(payload, cfg.jwtSecret);
    res.json({ token: token })
  } else {
    res.sendStatus(401);
  }
});

app.listen(3000, function () {
    console.log("Running...")
});

module.exports = app;
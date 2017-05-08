 var router = require('express').Router();
 var users = require('../models/users.js');
 var jwt = require('jwt-simple');
 var cfg = require('../auth/config.js');

router.get('/', function(req, res) {
   res.json({ status: "Express is up!" });
});

router.get('/user', function(req, res) {
  res.json(users.getUser(req.user.id));
});

router.post('/login', function (req, res) {
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

module.exports = router;
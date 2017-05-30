 var router = require('express').Router();
 var users = require('../models/users.js');
 var jwt = require('jwt-simple');
 var auth = require('../auth/auth.js')();
 var cfg = require('../auth/config.js');
 
router.use(auth.initialize());

router.get('/', function(req, res) {
   res.json({ status: "Express is up!" });
});

/**
 * To access this route need a token generated by /login route
 * This token had to be in Authorization header starting with JWT
 * Ex.: JWT TokenGenerated
 */
router.get('/user', auth.authenticate(), function(req, res) {
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
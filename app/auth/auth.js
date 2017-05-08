var passport = require('passport');
var ExtractJwt = require('passport-jwt').ExtractJwt;
var users = require('../models/users.js');
var cfg = require('../auth/config.js');
var JwtStrategy = require('passport-jwt').Strategy;
var opts = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = function() {
  var strategy = new JwtStrategy(opts, function(payload, done) {
    console.log("payload received", payload);// just for debug
    var user = users.getUser(payload.id) || null;
      if (user)
        return done(null, { id: user.id });
      else
        return done(new Error("User not found"), null);
  });
  passport.use(strategy);

  var _initialize = function() {
      return passport.initialize();
  }

  var _authenticate = function() {
      return passport.authenticate('jwt', cfg.jwtSession);
  }

  return {
      initialize: _initialize,
      authenticate: _authenticate
  };
};
//var Users = require('../models/users').Users;
var User = require('../models/users').Users;
var AuthError = require('../models/users').AuthError;
var async = require('async');
var HttpError = require('../utils/error').HttpError;

exports.index = function(req, res){
res.render('reg');
}

exports.send = function(req, res, next){
  var username = req.body.username;
  var password = req.body.password;
  User.authorize(username, password, function(err, user){
    if (err){
	  if(err instanceof HttpError){
	    return next(new HttpError(403, err.message));
	  } else{
	    return next(err);
		}
	}
    req.session.user = user._id;
	console.log(req.session.user);
	console.log(username);
	res.redirect('/');
  });
  }
  
  exports.logout = function(req, res){
    req.session.user = null;
	res.redirect('/');
  };
  
  
  
  
/*
var users = new Users({
username: username,
password: password
});
users.save(function(){
console.log('OK');
});
*/




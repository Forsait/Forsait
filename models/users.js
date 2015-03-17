var crypto = require('crypto');

var mongoose = require('../config/mongoose');

var async = require('async');

var HttpError = require('../utils/error').HttpError;

Schema = mongoose.Schema;

var schema = new Schema({
username:{
type: String,
unique: true,
required: true
},
hashedPassword:{
type: String,
required: true,

},
salt:{
type: String,
required: true
},
created:{
type: Date,
default: Date.now
}
});

schema.methods.encryptPassword = function(password){
return crypto.createHmac('sha1', this.salt).update(password).digest('hex');// sha1 -метод шифрования, this.salt - что будем шифровать, password - указываем какое поле обновить
};



schema.virtual('password')
  .set(function(password){
  this._plainPassword = password;// создали свойство к текущему объекту
  this.salt = Math.random() + '';// случайный набор символов
  this.hashedPassword = this.encryptPassword(password);//будет вызывать нашу функцию и шифровать пароль
  })
  .get(function(){return this._plainPassword;});
  
  schema.methods.checkPassword = function(password) {
  return this.encryptPassword(password) === this.hashedPassword;
  };
  
  schema.statics.authorize = function(username, password, callback){
  var User = this;
  
  async.waterfall([
    function(callback){
	User.findOne({username: username}, callback);
    },
	function(user, callback){
	  if(user){
	    if(user.checkPassword(password)){
	      callback(null, user);
	    } else{
		    callback(new HttpError(403, 'Wrong password'));
		  }
	  } else {
	      var user = new User({username: username, password: password});
		  user.save(function(err){
		  if (err) return callback(err);
		  callback(null,user);
		  });
	    }
	}
  ], callback);
  }

exports.Users = mongoose.model('Users', schema);
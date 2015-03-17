var mongoose = require('../config/mongoose'),
    Schema = mongoose.Schema;
	
var schema = new Schema({
  name: {
  type: String,
  unique: true,
  require: true
  },
  body: {
  type: Array
  },
  url: {
  type: String,
  unique: true,
  require: true
  },
});

exports.mainText = mongoose.model('mainText', schema);
  

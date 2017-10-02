var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');

var UserSchema = new mongoose.Schema({
    email: {
	    type: String,
	    unique: true,
	    required: true,
	    trim: true
  },
  	username: {
	    type: String,
	    unique: true,
	    required: true,
	    trim: true
  },
  	password: {
	    type: String,
	    required: true,
  },
  passwordConf: {
	    type: String,
	    required: true,
  },
  name: {
	    type: String,
	    required: true,
  },
  lastname: {
	    type: String,
	    required: true,
  },
  website: {
	    type: String,
	    required: true,
  },
  telephone: {
	    type: String,
	    required: true,
  },
  address: {
	    type: String,
	    required: true,
  },
  vatNumber: {
	    type: String,
	    required: true,
  },
  date: {
	    type: Date,
	    default: Date.now,
  },
  active: {
	    type: Boolean,
	    default: false,
  }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
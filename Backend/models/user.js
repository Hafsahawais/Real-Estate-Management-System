const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var passportLocalMongoose = require('passport-local-mongoose');

// const uniqueValidator = require('mongoose-unique-validator');
// const bcrypt = require('bcryptjs');

const user = new Schema ({
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  phoneNo: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  city: {
    type: String
  },
  userType: {
    type: Number,
    default: 1
  },
  updatedOn: {
    type: Date,
    default: Date.now()
  },
  createdOn: {
    type: Date
  },
  images: {
    type: [String]
  },
  imgPath: {
    type: String
  },
  admin: {
    type: Boolean,
    default: false
  }

});
user.plugin(passportLocalMongoose);

var User = mongoose.model('user', user);
module.exports = User;

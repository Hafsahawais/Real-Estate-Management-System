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
  address: {
    type: String
  },
  city: {
    type: String
  },
  country: {
    type: String
  },
  about: {
    type: String
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
},{timestamps: true});
user.plugin(passportLocalMongoose);

var User = mongoose.model('user', user);
module.exports = User;

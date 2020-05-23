const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var passportLocalMongoose = require('passport-local-mongoose');

// const uniqueValidator = require('mongoose-unique-validator');
// const bcrypt = require('bcryptjs');

const user = new Schema ({
  // name: {
  //   type:String,
  //   unique:true,
  //   required: true
  // },
  // password: {
  //   type: String,
  //   required: true,
  //    minlength: 8
  // },
  admin: {
    type: Boolean,
    default: false
  }
  // booking_id: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'booking'
  // }

});
user.plugin(passportLocalMongoose);

var User = mongoose.model('user', user);
module.exports = User;

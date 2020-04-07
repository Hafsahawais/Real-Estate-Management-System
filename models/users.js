const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

const user = new Schema ({
  name: {
    type:String,
    unique:true,
    required: true
  },
  password: {
    type: String,
    required: true,
     minlength: 8
  },
  booking_id: {
    type: Schema.Types.ObjectId,
    ref: 'booking'
  }

});

user.plugin(uniqueValidator);

//this function will be called before a document is saved
user.pre('save', function(next) {
  let user = this;

  if (!user.isModified('password')) {
    return next();
  }

  //we generate the salt using 12 rounds and then use that salt with the received password string to generate our hash
  bcrypt.genSalt(12)
    .then((salt) => {
      return bcrypt.hash(user.password, salt);
    })
    .then((hash) => {
      user.password = hash;
      next();
    })
    .catch((err) => next(err));
});

var User = mongoose.model('user', user);
module.exports = User;

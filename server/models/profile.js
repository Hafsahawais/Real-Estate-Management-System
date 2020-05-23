const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var passportLocalMongoose = require('passport-local-mongoose');

const profile = new Schema ({
  name: {
    type:String,
    unique:true,
    required: true
  },
  display_picture: {
    type: String,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
  // booking_id: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'booking'
  // }

});


var Profile = mongoose.model('profile', profile);
module.exports = Profile;

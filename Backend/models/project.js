const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

const project = new Schema ({
  name: {
    type:String,
    required:true,
    unique: true
  },
  images: {
    type: [String]
  },
  imgPath: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  is_active: {
    type: Boolean,
    default: true
  },
});

var Project = mongoose.model('project', project);
module.exports = Project;

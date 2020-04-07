const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

const project = new Schema ({
  name: {
    type:String,
    required:true,
    unique: true
  },
  total_number: {
    type: Number
  }
});

var Project = mongoose.model('project', project);
module.exports = Project;

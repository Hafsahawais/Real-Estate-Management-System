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
  priceFrom: {
    type: Number,
    required: true
  },
  priceTo: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  builder: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNo: {
    type: String,
    required: true
  },
  propertyTypes: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  properties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'property'
    }
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
},{timestamps: true});

var Project = mongoose.model('project', project);
module.exports = Project;

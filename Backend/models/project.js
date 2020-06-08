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
    type: String,
    required: true
  },
  priceTo: {
    type: String,
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
  slug : {
    type: String,
    required: true
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
  isActive: {
    type: Boolean,
    default: true
  },
},{timestamps: true});

var Project = mongoose.model('project', project);
module.exports = Project;

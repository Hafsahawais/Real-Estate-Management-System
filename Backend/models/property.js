var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Property = mongoose.model('property', new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  propertyFor: {
    type: String,
    required: true,
    default: 'sell',
    enum: ['sell', 'rent']
  },
  description: {
    type: String
  },
  type: {
    type: String
  },
  city: {
    type: String
  },
  length: {
    type: Number,
    required: true
  },
  breadth: {
    type: Number,
    required: true
  },
  cornerPlot: {
    type: Boolean,
    default: false,
    enum: [true, false]
  },
  address: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  price: {
    type: Number
  },
  phoneNo: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  status: {
    type: String,
    enum: ['Available', 'Sold', 'Booked', 'Owned', 'Rented'],
    default: 'Available',
    required: true
  },
  bookingId: {
    type: Schema.Types.ObjectId,
    ref: 'booking',
    required: function () { return (this.status === 'Booked')}
  },
  isActive: {
    type: Boolean,
    default: true
  },
  slug : {
    type: String,
    required: true
  },
  images: {
    type: [String]
  },
  imgPath: {
    type: String
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'project'
  },

},{timestamps: true}) );

module.exports = Property;

const mongoose = require('mongoose');
var users = require('../models/user');
var Property = require('../models/property');
var Booking = require('../models/booking');

module.exports = {
  getAllBookings: (req, res) => {
    // console.log('GET Bookings');

    Booking.find({ isActive: true })
      .exec((err, data) => {
        if(err)
          res.status(400).send(err);
        res.status(200).send(data);
      });
  },

  addBooking: (req, res) => {
    var booking = new Booking();
    booking.message = req.body.message;
    booking.property_id = req.body.property_id;

    booking.save((err, result) => {
      if (result)
      {
        Property.findOneAndUpdate( {_id : req.body.property_id},{bookingId: result._id , status: 'Booked'})
      }
      if(err)
        res.send(err);
      res.json({ message: 'booking made successfully' });
    })

  },
//  booking according to userid
  getBookingList: (req, res) => {
    Booking.find({ user_id: req.params.user_id, isActive: true })
      .populate('user_id', 'name')
      .exec((err, data) => {
        if(err)
          res.status(400).send(err);
        res.status(200).json(data);
      });
  },
  removeBooking: (req, res) => {
    Booking.remove({_id: req.params._id }, (err, result) => {
      if(err)
        res.status(400).send(err);
      res.status(200).json({ message: 'Booking removed successfully', data: result });
    })
  },
}

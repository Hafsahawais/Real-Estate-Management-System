const mongoose = require('mongoose');
var users = require('../server/models/user');
var Property = require('../server/models/property');
var Booking = require('../server/models/booking');

module.exports = {
  getAllBookings: (req, res) => {
    // console.log('GET Bookings');

    Booking.find({ is_active: true })
      .exec((err, data) => {
        if(err)
          res.status(400).send(err);
        res.status(200).send(data);
      });
  },

  addBooking: (req, res) => {
    var booking = new Booking();
    booking.message = req.body.message;

    booking.save((err) => {
      if(err)
        res.send(err);
      res.json({ message: 'booking made successfully' });
    })
  },
//  booking according to userid
  getBookingList: (req, res) => {
    Booking.find({ user_id: req.params.user_id, is_active: true })
      .populate('user_id', 'name')
      .exec((err, data) => {
        if(err)
          res.status(400).send(err);
        res.status(200).json(data);
      });
  },
  removeBooking: (req, res) => {
    Booking.remove({_id: req.params.booking_id }, (err, result) => {
      if(err)
        res.status(400).send(err);
      res.status(200).json({ message: 'Booking removed successfully', data: result });
    })
  },
}

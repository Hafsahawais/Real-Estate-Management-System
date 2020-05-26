const express = require('express');
var app = express();

var bookingController = require('../controller/booking.controller');

var router = express.Router();


router.route('/booking')
  .get(bookingController.getAllBookings)
  .post(bookingController.addBooking);


router.get('/bookings/:user_id', bookingController.getBookingList);

router.delete('/booking/:booking_id', bookingController.removeBooking);

module.exports = router;

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Booking = require('../models/booking');
const User = require('../models/user');
const Properties = require('../models/property');

const bookingRouter = express.Router();
bookingRouter.use(bodyParser.json());

bookingRouter.route('/')
  // Retrieve all properties
  .get((req,res,next) => {

    Booking.find({})
      .then((booking) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(booking);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  //create a property
  .post((req, res, next) => {
    var propertyId = req.body.property;
    var userId = req.body.user;
    Booking.create(req.body)
      .then((booking) => {
        booking.message = req.body.message;
        Properties.findOne({_id: propertyId});
        User.findOne({_id: userId});

        console.log('booking Created ', booking);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(booking);
      }, (err) => next(err))
      .catch((err) => next(err));
  });


module.exports = bookingRouter;

// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// // const Booking = require('../models/booking');
// const User = require('../models/user');
// // const Properties = require('../models/property');
// const Profile = require('../models/profile');
//
//
// const profileRouter = express.Router();
// profileRouter.use(bodyParser.json());
//
// profileRouter.route('/')
// //  create a profile for a user
// .post((req, res, next) => {
//
//   var userId = req.body.user;
//   Profile.create(req.body)
//     .then((profile) => {
//       profile.name = req.body.name;
//       User.findOne({_id: userId});
//
//       console.log('Profile Created ', profile);
//       res.statusCode = 200;
//       res.setHeader('Content-Type', 'application/json');
//       res.json(profile);
//     }, (err) => next(err))
//     .catch((err) => next(err));
// })
//   //update a profile
//   .put((req, res, next) => {
//     Profile.findByIdAndUpdate(req.params.profileId, {
//       name: req.body.name,
//       $set: req.body
//     }, { new: true })
//       .then((profile) => {
//         res.send('updated profile name to :' + req.body.name);
//         console.log('Profile updated ', profile);
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(profile);
//       }, (err) => next(err))
//       .catch((err) => next(err));
//   })
// //delete a profile
// .delete((req, res, next) => {
//   Profile.findByIdAndRemove(req.params.profileId)
//
//     .then((resp) => {
//       console.log('Profile deleted ');
//       res.statusCode = 200;
//       res.setHeader('Content-Type', 'application/json');
//       res.json(resp);
//     }, (err) => next(err))
//     .catch((err) => next(err));
// });
// module.exports = profileRouter;

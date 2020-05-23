const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Properties = require('../models/property');
const User = require('../models/user');
const propertyRouter = express.Router();

propertyRouter.use(bodyParser.json());

propertyRouter.route('/')
  // Retrieve all properties
  .get((req,res,next) => {

    Properties.find({})
      .then((Properties) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Properties);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  //create a property
  .post((req, res, next) => {
    // var userId = req.body.user;
    Properties.create(req.body)
      .then((property) => {
        property.address = req.body.address;
        property.description = req.body.description;
        property.image = req.body.image;
        // User.findOne({_id: userId});

        console.log('Property Created ', property);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(property);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  // delete all properties
  .delete((req, res, next) => {
    Properties.remove({})
      .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
      }, (err) => next(err))
      .catch((err) => next(err));
  });

propertyRouter.route('/:propertyId')
  .get((req,res,next) => {
    Properties.findById(req.params.propertyId)
    // var userId = req.body.user
      .then((properties) => {
        properties.address = req.body.address;
        properties.description = req.body.description;
        // User.findOne({_id: userId});
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(properties);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  //update a property
  .put((req, res, next) => {
    Properties.findByIdAndUpdate(req.params.propertyId, {
      $set: req.body
    }, { new: true })
      .then((property) => {
        property.address = req.body.address;
        res.statusCode = 200;
        res.send('Property updated');
        res.setHeader('Content-Type', 'application/json');
        res.json(property);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Properties.findByIdAndRemove(req.params.propertyId)
      .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
      }, (err) => next(err))
      .catch((err) => next(err));
  });


module.exports = propertyRouter;

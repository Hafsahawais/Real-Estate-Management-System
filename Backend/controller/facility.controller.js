const mongoose = require("mongoose");
var fs = require('fs');
var http = require('http');
const helpers = require('../provider/helper');
var facility = require('../models/facilities');
var user = require('../models/user');

module.exports = {
    vehicleRegisteration: (req, res) => {
        var vehicle = new facility();
        user.find({_id: req.params.userId}, (err,result) => {
            if (user.$id === req.body._id) {
                vehicle.vehicle_details.user_id = user._id;
                vehicle.vehicle_details.vehicleNo = req.body.vehicleNo;
                const f = new facility(req.body);
                const facility = facility.save();

                if (facility)
                    res.status(200).json({result, message: "Your vehicle has been successfully registered"});
                else throw new Error('Something Went Wrong');
            }
            else
                res.status(200).json({message: "vehicle already exists"}, result);
        });
    },
    groundReservation: (req, res) => {
        var ground = new facility();
        ground.ground_reservation.user_id = user._id;
        ground.ground_reservation.reservationType = req.body.reservationType;
         ground.save((err, data) => {
            if (err){
                // console.log('User Save')
                res.status(400).send(err);
            }
            else {
                // console.log('user added')
                res.status(200).json({message: "ground reservation Successfully", id: data._id});
            }
    })
    }
};

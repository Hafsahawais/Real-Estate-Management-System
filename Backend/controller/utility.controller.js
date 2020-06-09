const mongoose = require("mongoose");
var fs = require('fs');
var http = require('http');
const helpers = require('../provider/helper');
var Utility = require('../models/utilities');
var Property = require('../models/property');
const date = require('date-and-time');

module.exports = {
    addMaintenance: (req, res) => {

        const now = new Date();
        Utility.find({_id: req.params.property_id}, (err,result) => {
            result.maintenance_details.month = date.format(now, 'ddd, MMM DD YYYY');
            result.maintenance_details.charge = req.body.charge ;
            if(result.maintenance_details.charge > 0 )
            {
                result.maintenance_details.paid = true;
            }
            else
                res
                    .status(200)
                    .json({message: "maintenance paid successfully", id: req.params.propertyId});


        });
    },

};

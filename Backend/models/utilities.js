const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);


const utilitySchema = new Schema ({
    month:{
        type: Date(),
    },
    paid:{
     type: Boolean,
    },
    charges:{
        type: Number,
    },

});
const utility = new Schema ({
    property_id: {
        type: Schema.Types.ObjectId,
        ref: 'property'
    },
    maintenance_details: {
        year: {
            type: Date()
        },
        details:[utilitySchema]
    },
    electricity_details: {
        year: {
            type: Date()
        },
        details:[utilitySchema]
    },
    gas_details: {
        year: {
            type: Date()
        },
        details:[utilitySchema]
    },
});
module.exports = utility;

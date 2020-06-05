const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);


const utilitySchema = new Schema ({
    month:{
        type: Date(),
        required:true
    },
    paid:{
     type: Boolean,
        required:true
    },
    charges:{
        type: Number,
        required:true
    },

});
const utility = new Schema ({
    maintainence_details:[
    utilitySchema
    ],
    electricity_details:[
    utilitySchema
    ],
    gas_details:{
        year:
            {
                type: Date()
            },
        details:[
            utilitySchema
        ]
    },
});
module.exports = utility;

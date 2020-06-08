const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

const facilities = new Schema ({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    vehicle_details: {
        availed: Boolean,
        vehicleNo: {
            type: String,
            unique: true
        }
    },
    ground_reservation:{
        availed: Boolean,
        reservationType: {
            type: String,
            enum: ['ground', 'park','hall']
        }
    },


},{timestamps: true});
var facility = mongoose.model('facilities', facilities);
module.exports = facility;

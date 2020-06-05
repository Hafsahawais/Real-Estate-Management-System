const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

const facilities = new Schema ({
    vehicle_details:[{
        user_id: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ],
        vehicleNo: [{
            type: String,
            required:true,
            unique: true


        }]
    }],
    ground_reservation:[{
        user_id: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ],
        reservationType: [{
            type: String,
            required:true,
            enum: ['ground', 'park','hall']
        }]

    }],


});
var facility = mongoose.model('facilities', facilities);
module.exports = facility;

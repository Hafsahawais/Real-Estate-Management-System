const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Complain = mongoose.model('complain',new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required : true
    },
    // user_id: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'user',
    //
    // },
    // property_id:{
    //     type: Schema.Types.ObjectId,
    //     ref: 'property',
    // },
    Date: {
        type : Date,
        default : Date.now()
    }
}) );

module.exports = Complain;

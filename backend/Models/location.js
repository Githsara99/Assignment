const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
    sname: {
        type: String,
        required: [true, 'Please add name'],
    },
    address: {
        type: String,
        required: [false, 'Please add address'],
    },
   
    phone: {
        type: String,
        required: [false, 'Please add telephone number']
    },
    devices: {
        type: [String],
        default: [],
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Location', locationSchema);

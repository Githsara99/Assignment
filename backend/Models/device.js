const mongoose = require("mongoose");

const deviceSchema = mongoose.Schema({
    sNumber: {
        type: String,
        unique: true,
    },
    type: {
        type: String,
        required: [true, 'Please add type'],
    },
    image: {
        type: String,
        required: [true, 'Please add image'],
    },
    status: {
        type: String,
        required: [false, 'Please add status']
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Device', deviceSchema);

const mongoose = require('mongoose');

var destination = mongoose.model('destination',{
    name: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    pin: {
        type: Number
    }
});

module.exports = { destination }
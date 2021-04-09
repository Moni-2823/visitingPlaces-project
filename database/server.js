const mongodb = require('mongodb');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/travellingPlaces', {useNewUrlParser: true, useUnifiedTopology: true})
console.log('connected to mongoose');

module.exports = { mongoose }
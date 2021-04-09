const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/travellingPlaces', {useNewUrlParser: true, useUnifiedTopology: true})
console.log('connected to mongoose');

var port = 3000;

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

app.post('/savingData',(req, res) => {
    var jagah = new destination(req.body)
    jagah.save(req.body).then((doc) => {
      if(!doc) {
          return res.status(404).send({msg: 'bad request'});
      }  
      console.log('data saved sucessfully',doc);
      res.status(200).send({msg: 'saved data is....',data: doc});
    }, (err) => {
        res.status(400).send({msg: 'error found'});
    })
})

app.get('/findingData',(req, res) => {
    console.log('body request',req.body);
    destination.find().then((doc) => {
        if(!doc) {
            res.status(404).send({msg: 'incomplete data found'});
        }
        console.log('received data is::',doc);
        res.status(200).send({msg: 'finded data',data: doc});
    }, (err) => {
        res.status(400).send({msg: 'error found'});
    })
})


app.listen((port), () => {
    console.log(`server upon port ${port}`);
})
const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./../database/server')
const { destination } = require('./../database/models/destination')
const {
    badRequestForSaving,
    badRequestForFind,
    errorMsg,
    badRequestForUpdate,
    badRequestForDelete
} = require('./../commonFunctions/appCommonFunction')

var app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

var port = process.env.PORT || 3000;

app.post('/savingData',(req, res) => {
    var jagah = new destination(req.body)
    jagah.save(req.body).then((doc) => {
        badRequestForSaving(res, doc)
        console.log('data saved sucessfully',doc);
        res.status(200).send({msg: 'saved data is....',data: doc});
    }, (err) => {
        errorMsg(res);
    })
})

app.get('/findingData',(req, res) => {
    console.log('body request',req.body);
    destination.find().then((doc) => {
        badRequestForFind(res, doc)
        console.log('received data is::',doc);
        res.status(200).send({msg: 'finded data',data: doc});
    }, (err) => {
        errorMsg(res);
    })
})

app.post('/updatingInData',(req, res) => {
    destination.findByIdAndUpdate(req.body.id,{$set:{
        name: req.body.name
    }},{new: true}).then((doc) => {
        badRequestForUpdate(res, doc);
        console.log('updated data is...',doc);
        res.status(200).send({msg: 'data updated sucessfully',data: doc});
    }, (err) => {
        errorMsg(res);
    })
})

app.post('/deletingFromData',(req, res) => {
    destination.findByIdAndDelete(req.body.id).then((doc) => {
        badRequestForDelete(res,doc);
        console.log('deleted data is...',doc);
        res.status(200).send({msg: 'data deleted sucessfully',data: doc});
    }, (err) => {
        errorMsg(res);
    })
})


app.listen((port), () => {
    console.log(`server upon port ${port}`);
})
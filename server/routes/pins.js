var express = require('express');
var router = express.Router();
// bring in our Mongoose model
var pin = require('../models/document.model.js');

router.get('/', function (req, res) {
    // find all of the people in the collection
    pin.find({}, function (err, data) {
        
        
        if (err) {
            console.log('find error: ', err);
            res.sendStatus(500);
        } else {
            console.log('found data: ', data);
            res.send(data);
        }
    });
});

router.post('/', function (req, res) {
    console.log('new pin to store: ', req.body);
    

    // use model/constructor to make a Mongoose Object
    var newPin = new pin(req.body);

    // insert into our collection
    newPin.save(function (err, data) {
        console.log('saved to the collection: ', data);
        if (err) {
            console.log('save error: ', err);

            res.sendStatus(500);
        } else {
            res.send(data._id);
        }

    });
});
router.put('/', function (req, res) {
    var changePin = new pin;
    changePin.ID = req.body.ID;
    changePin.location = req.body.location;
    console.log('===================================================================================================');
    console.log('pins.js line 47 changePin.ID is:', changePin.ID);
    console.log('pins.js line 47 changePin.location is:', changePin.location);
    console.log(changePin);
    
    pin.findByIdAndUpdate(
        { _id: changePin.ID },
        { $set: { location: changePin.location }},
        function (err, data) {
        if (err) {
            console.log('save error: ', err);

            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }

    });
});

router.delete('/:id', function (req, res) {
    pin.findByIdAndRemove(
        { _id: req.params.id },
        function (err, data) {
            if (err) {
                console.log('delete error: ', err);

                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});


module.exports = router;
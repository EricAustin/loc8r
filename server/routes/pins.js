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
            res.sendStatus(201);
        }

    });
});

// router.put('/:id', function (req, res) {
//     var personId = req.params.id;

//     console.log('new location:', req.body);
//     Person.findByIdAndUpdate(
//         { _id: personId },
//         { $set: { name: req.body.name, location: req.body.location, dateOfBirth: req.body.dateOfBirth, internetPts: req.body.internetPts }
//         // { $set: {  }
//         },
//         function (err, data) {
//             if (err) {
//                 console.log('update error: ', err);

//                 res.sendStatus(500);
//             } else {
//                 res.sendStatus(200);
//             }
//         }
//     )
// });

// router.delete('/:id', function (req, res) {
//     Person.findByIdAndRemove(
//         { _id: req.params.id },
//         function (err, data) {
//             if (err) {
//                 console.log('delete error: ', err);

//                 res.sendStatus(500);
//             } else {
//                 res.sendStatus(200);
//             }
//         }
//     );
// });


module.exports = router;
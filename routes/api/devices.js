var express = require('express');
var router = express.Router();
var Device = require('../../models/device');

router.route('/devices')
    // create device
    .post(function(req, res) {
        console.log('I1m here');
        var device = new Device({
            deviceId: req.body.deviceId,
            user: req.body.user
        });
        // device.deviceId = req.body.deviceId;
        // device.user = req.body.user;
        // save the device and check for errors
        try{
            device.save(function(err) {
                console.log('am intrat');
                if (err)
                    res.send(err);

                res.json({ message: 'Device created!' });
            });
        } catch(e){
            console.log(e);
        }
    })
    // find devices
    .get(function(req, res) {
        device.find(function(err, devices) {
        if (err)
            res.send(err);

        res.json(devices);
    });
});

router.route('/devices/:device_id')
    // get the device by id
    .get(function(req, res) {
        device.findById(req.params.device_id, function(err, grantedDevice) {
            if (err)
                res.send(err);
            res.json(grantedDevice);
        });
    })
    .put(function(req, res) {
        // update my device
        device.findById(req.params.device_id, function(err, grantedDevice) {
            if (err)
                res.send(err);
            grantedDevice.name = req.body.name;
            grantedDevice.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Device updated!' });
            });
        });
    })
    .delete(function(req, res) {
        device.remove({
            _id: req.params.device_id
        }, function(err, bear) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted device!' });
        });
    });

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

module.exports = router;
var express = require('express');
var router = express.Router();
var Device = require('../../models/device'),
DeviceModel = Device.model('Devices');


router.route('/devices')
    // create device
    .post(function(req, res) {
        // save the device and check for errors
        try{
            DeviceModel.find({deviceId:req.body.deviceId}, function(err, grantedDevice) {
                if (err)
                    res.send(err);
                if(grantedDevice.length > 0) {
                    res.json({ message: 'Device already created!' }); 
                } else
                {
                    var new_device = new DeviceModel(req.body);            
                    new_device.save(function(err) {
                        console.log('am intrat');
                        if (err)
                            res.send(err);
        
                        res.json({ message: 'Device created!' });
                    });
                }
            });
        } catch(e){
            console.log(e);
        }
    })
    // find devices
    .get(function(req, res) {
        DeviceModel.find(function(err, devices) {
        if (err)
            res.send(err);

        res.json(devices);
    });
});

router.route('/devices/:device_id')
    // get the device by id
    .get(function(req, res) {
        DeviceModel.find({deviceId:req.params.device_id}, function(err, grantedDevice) {
            if (err)
                res.send(err);
            res.json(grantedDevice);
        });
    })
    .put(function(req, res) {
        // update my device
        DeviceModel.updateOne(    
            {
                deviceId: req.params.device_id
            },
            { 
                $set: { 
                    'user.firstName': req.body.firstName,
                    'user.lastName': req.body.lastName
                },
            },
            function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Device updated!' });
            });
    })
    .delete(function(req, res) {
        DeviceModel.remove({
            deviceId: req.params.device_id
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
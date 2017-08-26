var MongoClient = require('mongoose').MongoClient;
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var uri = 'mongodb://alex:1234@ds159963.mlab.com:59963/letmein';

mongoose.connect( uri, function (err, res) {
    if (err) { 
      console.log ('ERROR connecting to: ' + uri + '. ' + err);
    } else {
      console.log ('Succeeded connected to: ' + uri);
    }
  });

var DeviceSchema = new mongoose.Schema({
    deviceId: String,
    user: {
       firstName: String,
       lastName: String
    }
});

module.exports = mongoose.model('Devices', DeviceSchema);
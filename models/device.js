var MongoClient = require('mongoose').MongoClient;
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var uri = 'mongodb://localhost/devices';

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
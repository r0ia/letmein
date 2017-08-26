var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var uri = 'mongodb://localhost/devices';

mongoose.createConnection( uri, function (err, res) {
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
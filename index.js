const app = require('express')(),
  http = require('http').Server(app),
  io = require('socket.io')(http);


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('New user connected!');
  socket.on('chat message', function(msg){
    console.log('Message: ' + msg);
  })
  socket.on('disconnect', function(){
    console.log('User disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
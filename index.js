var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  // console.log('a user connected');
  io.emit('message', `A new user, ${Date.now()}, has connected`);

  socket.on('chat message', function(msg) {
    socket.broadcast.emit('chat message', `${msg.user}: ${msg.text}`);
  });

  socket.on('disconnect', function() {
    io.emit('message', 'user disconnected');
    // console.log('user disconnected');
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});

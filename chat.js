var socketIo = require('socket.io'),
    async = require('async');

var sockets = [];

function onMessageCreated(data) {
  async.forEach(sockets, function (socket) {
    socket.emit('message_created', { body: data.body });
  });
}

function onConnection(socket) {
  sockets.push(socket);
  socket.on('create_message', onMessageCreated);
}


exports.init = function(app) {
  var io = socketIo.listen(app);
  io.sockets.on('connection', function(socket) {
    onConnection(socket);
  });
}


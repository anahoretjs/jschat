exports.init = function(app) {
  var io = require('socket.io').listen(app),
      async = require('async');

  var sockets = [];

  io.sockets.on('connection', function (socket) {
    sockets.push(socket);
    socket.on('create_message', onMessageCreated);
  });

  function onMessageCreated(data) {
    async.forEach(sockets, function (socket) {
      socket.emit('message_created', { body: data.body });
    });
  }

}


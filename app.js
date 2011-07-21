
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer(),
    io = require('socket.io').listen(app),
    async = require('async');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: "JSChat",
    startedAt: new Date()
  });
});

// Socket events

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

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

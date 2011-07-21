var socket = io.connect('http://aratak');

socket.on('message_created', function (data) {
  console.log(data);
  $("ul#message_list").append("<li>" + data.body + "</li>")
});

$("form#new_message").submit(function(e) {
  socket.emit('create_message', { body: this.body.value });
  e.stopPropagation();
  return false;
})

var socket = io();

socket.on("connect", function () {
  console.log("connected to server");
});

socket.on("disconnect", function () {
  console.log("disconnected from server");
});

socket.on("newMessage", function (message) {
  console.log(message);
  var text = `${message.from}: ${message.text}`;
  var li = `<li>${text}</li>`
  jQuery("#messages").append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit("createMessage", {
    from: "user",
    text: jQuery("[name=message]").val()
  }, function () {
    console.log("server has received it ok");
  })
});

//socket.emit("createEmail", { text:"pepelomo"});

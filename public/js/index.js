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

socket.on("newLocationMessage", function (message) {
  console.log(message);
  var text = `${message.from}: <a href='${message.url}' target='blank'>Click for my location</a>`;
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

var locationButton = jQuery("#location-button");
locationButton.on("click", function () {
  if (!navigator.geolocation) {
    return alert("Geolocation no supported by your browsers");
  }
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit("createLocationMessage", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    })
  }, function () {
    alert("Unable to fetch location");
  })

});

//socket.emit("createEmail", { text:"pepelomo"});

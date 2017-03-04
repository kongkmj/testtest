
$(document).ready(function() {

});


const socketDoor = io.connect("http://127.0.0.1:3000");

socketDoor.on('dashValue',function (dataArray) {
  var now = new Date();
  var hour = now.getHours();
  var min = now.getMinutes();
  var second = now.getSeconds();
});

// Etch-A-Sketch App
// =================
// Because devvin'g should always be something you love. :)

var eas = eas || {};
var socket = io.connect('http://localhost');

socket.on('news', function (data) {
  //console.log(data);
  socket.emit('my other event', { my: 'data' });
});

socket.on('userUpdate', function (data) {
  //console.log(data);
});

// TODO;
// 1. Render SVG Background View
// 2. Bind trigger to userUpdate
// 3. Render line per user count (d3)
// 4. Bind line controls to user
// 5. Phone coords back to socket to update other user views
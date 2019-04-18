const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

var app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));



io.on('connection', function(socket){


console.log("new user connected");


socket.on('createMessage',function(message){

console.log("the create message", message);

});


socket.emit('newMessage', {

from: 'Aniket',
text: 'Hello, Aniket here',
createdAt: '7:00pm'
});

socket.on('disconnect', function(){
	console.log("User Disconnected");
});

});






server.listen(port, function(){

console.log("Server is up on port " +port);

});

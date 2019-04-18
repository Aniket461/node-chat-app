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

socket.emit('newMessage',{

	from: 'admin',
	text: 'Welcome to the chat app',
	createdAt: new Date().getTime()

});

socket.broadcast.emit('newMessage', {

from: 'admin',
text: 'new user joined',
createdAt: new Date().getTime()

});

socket.on('createMessage',function(message){

console.log("the create message", message);
io.emit('newMessage', {

from: message.from,
text: message.text,
createdAt: new Date().getTime()

});

/*socket.broadcast.emit('newMessage', {

from: message.from,
text: message.text,
createdAt: new Date().getTime()

});*/

});
socket.on('disconnect', function(){
	console.log("User Disconnected");


});


});



server.listen(port, function(){

console.log("Server is up on port " +port);

});

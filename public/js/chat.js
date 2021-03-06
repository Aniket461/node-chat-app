var socket = io();

function scrollToBottom(){

//selectors

var messages = jQuery('#messages');
var newMessage = messages.children('li:last-child');

//heights
var clientHeight = messages.prop('clientHeight');
var scrollTop = messages.prop('scrollTop');
var scrollHeight = messages.prop('scrollHeight');
var newMessageHeight = newMessage.innerHeight();
var lastMessageheight = newMessage.prev().innerHeight();

if(clientHeight + scrollTop + newMessageHeight + lastMessageheight>= scrollHeight){
	messages.scrollTop(scrollHeight);
}

}

	socket.on('connect', function(){

		var params = jQuery.deparam(window.location.search);

		socket.emit('join',params, function(err){

			if(err){
				alert(err);
				window.location.href ='/';
			}
			else{
				console.log("no Error");
			}

		});
	});

	socket.on('disconnect', function(){

		console.log("Disconnected");

	});


	socket.on('updateUserList', function(users){

		var ol = jQuery('<ol></ol>');

		users.forEach(function(user){

			ol.append(jQuery('<li></li>').text(user));
		});

		jQuery('#users').html(ol);

	});

	socket.on('newMessage', function(message){
		var formattedTime = moment(message.createdAt).format('LT');
		var template = jQuery('#message-template').html();
		var html = Mustache.render(template, {

			text: message.text,
			from: message.from,
			createdAt: formattedTime
		});

		jQuery('#messages').append(html);
		scrollToBottom();

		/*console.log("The new message is",message);
		var li = jQuery('<li></li>');
		li.text(`${message.from} ${formattedTime}: ${message.text}`);


		jQuery('#messages').append(li);
*/
	});


	socket.on('newLocationMessage', function(message){

		var formattedTime = moment(message.createdAt).format('LT');
		var template = jQuery('#location-message-template').html();
		var html = Mustache.render(template, {

			url: message.url,
			from: message.from,
			createdAt: formattedTime
		});

		jQuery('#messages').append(html);
		scrollToBottom();

		/*var li = jQuery('<li></li>');
		var a = jQuery('<a target="_blank">My current location</a>');

		li.text(`${message.from} ${formattedTime}: `);
		a.attr('href', message.url);

		li.append(a);

		jQuery('#messages').append(li);
*/	});

	jQuery('#message-form').on('submit', function(e){

		e.preventDefault();

		var messagebox = jQuery('[name=message]');


		socket.emit('createMessage',{

			text: messagebox.val()

		}, function(){

			messagebox.val('')
			jQuery(".emojionearea-editor").empty();

		});

	});


	var locationButton = jQuery('#send-location');

	locationButton.on('click', function(){

		if(!navigator.geolocation){
			return alert('Geolocation not supported by your browser..');
		}



		locationButton.attr('disabled', 'disabled').text('Sending Location ...');

		navigator.geolocation.getCurrentPosition(function(position){

			locationButton.removeAttr('disabled').text('Send Location');
			socket.emit('createLocationMessage', {

				latitude: position.coords.latitude,
				longitude: position.coords.longitude

			});

		}, function(){
			locationButton.removeAttr('disabled').text('Send Location');
			alert('Unable to fetch location...');
		});

	});


socket.on('addimage', function(message){

console.log(message);

var formattedTime = moment(message.createdAt).format('LT');
		var template = jQuery('#image-message-template').html();
		var html = Mustache.render(template, {

			image: message.image,
			from: message.from,
			createdAt: formattedTime
		});

		jQuery('#messages').append(html);
		scrollToBottom();

});



jQuery("#imagefile").on('change', function(e){


var file = e.originalEvent.target.files[0];

var reader = new FileReader();
reader.onload = function(evt){


socket.emit('userImage', evt.target.result);



};

reader.readAsDataURL(file);

});


//speech to text

const btn = document.querySelector('.talk');
//const content = document.querySelector('.content');
const input = document.querySelector('.intext');
var recordButton = jQuery('#Speech');


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition ;

const recognition = new SpeechRecognition();

recognition.onstart = function(){
  console.log("Voice is activated, u can speak");

};

recognition.onresult = function(event){

  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  //content.textContent = transcript;
	recordButton.removeAttr('disabled').text('Record');

  input.value = transcript;

};

//add listener to the button

btn.addEventListener('click', () => {

	recordButton.attr('disabled', 'disabled').text('Recording ...');


recognition.start();


});

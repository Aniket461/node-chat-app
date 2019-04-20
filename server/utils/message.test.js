var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message')
describe('generateMessage', function(){

it('should generate correct message object', function(){
var from = 'Jen';
var text = 'Some Message';
var message = generateMessage(from, text);

expect(typeof message.createdAt).toBe('number');
expect(message).toMatchObject({

from,
text

});



});

});


describe('generateLocationMessage', function(){


it('should generate correct location message object', function(){


var from = 'Aniket';
var latitude = '1';
var longitude = '1';
var url = 'https://www.google.com/maps?q=1,1';

var message = generateLocationMessage(from, latitude, longitude);

expect(typeof message.createdAt).toBe('number');
expect(message).toMatchObject({

from,
url

});



});

});
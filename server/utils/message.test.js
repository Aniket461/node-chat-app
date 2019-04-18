var expect = require('expect');
var {generateMessage} = require('./message')
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
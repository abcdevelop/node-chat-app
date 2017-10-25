const expect=require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage',()=>{
    it('should generate correct message object',() => {
        var from='Bruno';
        var text='Hey. it is me!';
        var message = generateMessage(from,text);

        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(message.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage',()=>{
    it('should generate correct location object',() => {
        var from='Admin';
        var latitude='1';
        var longitude='2';
        var url='https://www.google.fr/search?q=1,2';
        var message = generateLocationMessage(from,latitude,longitude);

        expect(message.from).toBe(from);
        expect(message.url).toBe(url);
        expect(message.createdAt).toBeA('number');
    });
});
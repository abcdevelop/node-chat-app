const expect=require('expect');

var {generateMessage} = require('./message');

describe('generateMessage',()=>{
    it('should generate correct message object',() => {
        var from='bruno@example.com';
        var text='Hey. it is me!';
        var message = generateMessage(from,text);

        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(message.createdAt).toBeA('number');
    });
});
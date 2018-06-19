const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        // given
        const from = 'MrFoo';
        const text = 'Hello, World!';
        // when
        const result = generateMessage(from, text);
        // then
        expect(result.createdAt).toBeA('number');
        expect(result).toInclude({from, text});
    })
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        // given
        const from = 'MrFoo';
        const lat = 1;
        const long = 2;
        const url = 'https://www.google.com/maps?q=1,2';
        // when
        const result = generateLocationMessage(from, lat, long);
        // then
        expect(result.createdAt).toBeA('number');
        expect(result).toInclude({from, url});

    })
});

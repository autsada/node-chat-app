const expect = require('expect')

const {generateMessage} = require('./message')

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const from = 'Auddy'
        const text = 'Hello, how r u?'
        const message = generateMessage(from, text )

        expect(message.from).toBe(from)
        expect(message.text).toBe(text)
        expect(typeof message.createdAt).toBe('number')
    })
})
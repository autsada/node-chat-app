const expect = require('expect')

const {generateMessage, generateLocationMessage} = require('./message')

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

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        const from = 'Oody'
        const latitude = 1
        const longitude = 100
        const message = generateLocationMessage(from, latitude, longitude)

        expect(message.from).toBe(from)
        expect(message.url).toBe('https://www.google.com/maps?q=1,100')
        expect(typeof message.createdAt).toBe('number')
    })
})
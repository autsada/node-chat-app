const expect = require('expect')

const {isRealString} = require('./validation')

describe('isRealString', () => {
    it('should reject non-string values', () => {
        const nonString = 123
        const checkString = isRealString(nonString)

        expect(checkString).toBe(false)  
    })

    it('should reject string with only space', () => {
        const space = '     '
        const checkString = isRealString(space)

        expect(checkString).toBe(false)  
    })

    it('should allow string with non-space characters', () => {
        const spaceString = '  abc   '
        const checkString = isRealString(spaceString)

        expect(checkString).toBe(true)  
    })
})
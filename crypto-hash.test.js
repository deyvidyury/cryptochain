const cryptoHash = require('./crypto-hash');

describe('cryptoHash()', () => {

    it('generates a SHA-256 hashed output', () => {
        expect(cryptoHash('foo')).toEqual('2C26B46B68FFC68FF99B453C1D30413413422D706483BFA0F98A5E886266E7AE'.toLowerCase())
    })

    it('produces the same hash with the same input arguments in any order', () => {
        expect(cryptoHash('one','two','three')).toEqual(cryptoHash('three','one','two'))
    })
})
import BigNumber from 'bignumber.js';
import ByteBuffer from '../byteBuffer'

describe('byteBuffer helper', () => {
    it('should work - low bytes', () => {
        const bb = new ByteBuffer('000102030405060708090a0b0c0d0e0f')

        expect(bb.length() === 16)
        expect(bb.readByte() === 0x00)
        expect(bb.readShort() === 0x0201)
        expect(bb.readInt() === 0x06050403)
        const z = new BigNumber('0e0d0c0b0a090807', 16);
        expect(bb.readLong().isEqualTo(z))
        expect(bb.position() === 15)
        bb.position(1)
        expect(bb.readHexString(4) === '01020304')
    })
    it('should work - high bytes', () => {
        const bb = new ByteBuffer('f0f1F2f3f4f5f6f7f8f9fafbfcfdfeff')

        expect(bb.length() === 16)
        expect(bb.readByte() === 0xf0)
        expect(bb.readShort() === 0xf2f1)
        expect(bb.readInt() === 0xf6f5f4f3)
        const z = new BigNumber('fefdfcfbfaf9f8f7', 16);
        expect(bb.readLong().isEqualTo(z))
        expect(bb.position() === 15)
        bb.position(1)
        expect(bb.readHexString(4) === 'f1f2f3f4')
    })
    it('should work - text', () => {
        const bb = new ByteBuffer('41c3a9e4b8ad61e58d8ee4baba61e6b091efbc83efbc9e61f09fa881616161')
        expect(bb.readString(bb.length()) === 'Aé中a华人a民＃＞a🨁aaa')
    })
})
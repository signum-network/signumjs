import {sha256AsBase64, sha256AsBytes, sha256AsHex, sha256Binary} from '../sha256';

function hexToDec(s) {
    const digits = [0];
    let i, j, carry;
    for (i = 0; i < s.length; i += 1) {
        carry = parseInt(s.charAt(i), 16);
        for (j = 0; j < digits.length; j += 1) {
            digits[j] = digits[j] * 16 + carry;
            carry = digits[j] / 10 | 0;
            digits[j] %= 10;
        }
        while (carry > 0) {
            digits.push(carry % 10);
            carry = carry / 10 | 0;
        }
    }
    return digits.reverse().join('');
}

describe('sha256', () => {
    // implicitely tests sha256Raw and sha256Byte
    it('Should be able to generate sha256AsHex', async () => {
        const hash = await sha256AsHex('Some Text');
        expect(hash).toEqual('a7fd4c665fbf6375d99046ef9c525e8578feb7a4794d119447282db151c12cae');
    });
    it('Should be able to generate sha256AsBase64', async () => {
        const hash = await sha256AsBase64('Some Text');
        expect(hash).toEqual('p/1MZl+/Y3XZkEbvnFJehXj+t6R5TRGURygtsVHBLK4=');
    });

    it('testing', async() => {
        // const buffer = Buffer.from('BE0722974C3E0FFB524B55ED9F67BEFA876F62FF0704E60B02A80F0A143BA342', 'hex')
        const hashedArray = await sha256Binary('BE0722974C3E0FFB524B55ED9F67BEFA876F62FF0704E60B02A80F0A143BA342');
        const slicedArray = hashedArray.slice(0,8);
        const accountId =  hexToDec(Buffer.from(slicedArray).toString('hex'));
        console.log("AccountId: ", accountId);
        expect(accountId).toEqual('4120818300996180450');
    })

});

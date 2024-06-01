import {sha256} from '../sha256';

describe('sha256', () => {
    it('Should be able to generate sha256', async () => {
        const hash = await sha256('Some Text');
        expect(hash).toEqual('a7fd4c665fbf6375d99046ef9c525e8578feb7a4794d119447282db151c12cae');
    });
});

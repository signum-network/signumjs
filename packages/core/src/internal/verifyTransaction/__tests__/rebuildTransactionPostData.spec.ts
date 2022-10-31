import {rebuildTransactionPostData} from '../rebuildTransactionPostData';

describe('rebuildTransactionPostData', () => {
    it('should rebuilt as expeceted', () => {
        const rebuilt = rebuildTransactionPostData('unsignedBytes');
        expect(rebuilt).toBe({});
    });
});

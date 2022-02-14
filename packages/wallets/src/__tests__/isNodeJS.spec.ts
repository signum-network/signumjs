import {isNodeJS} from '../isNodeJS';

describe('isNodeJS', () => {
    it('should return true...because these tests just run on NodeJS', () => {
        expect(isNodeJS()).toBeTruthy();
    });
});

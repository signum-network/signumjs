import {vi} from 'vitest';
import {asyncRetry} from '../asyncRetry';

describe('asyncRetry', () => {
    it('should retry as expected, with success', async () => {
        let calledFirstTime = true;
        const asyncFn = vi.fn().mockImplementation(() => {
            if (calledFirstTime) {
                calledFirstTime = !calledFirstTime;
                return Promise.reject('First Run Error');
            }
            return Promise.resolve('All fine');
        });
        const onFailureAsync = vi.fn().mockImplementation((e, retryCount) => {
            return retryCount < 3;
        });

        await asyncRetry<void>({
            asyncFn,
            onFailureAsync
        });
        expect(asyncFn).toHaveBeenCalledTimes(2);
        expect(onFailureAsync).toHaveBeenCalledTimes(1);
    });

    it('should return the result of a successful retry', async () => {
        const asyncFn = vi.fn()
            .mockRejectedValueOnce('First Run Error')
            .mockResolvedValueOnce('All fine');
        const onFailureAsync = vi.fn().mockResolvedValue(true);

        const result = await asyncRetry<string>({asyncFn, onFailureAsync});
        expect(result).toBe('All fine');
        expect(asyncFn).toHaveBeenCalledTimes(2);
    });

    it('should stop on max retrials reached', async () => {
        const asyncFn = vi.fn().mockRejectedValue('AsyncFn Error');
        const onFailureAsync = vi.fn().mockResolvedValue(true); // would retry infinitely
        try {
            await asyncRetry<void>({
                asyncFn,
                onFailureAsync
            });
        } catch (e) {
            expect(e).toBe('AsyncFn Error');
        }
        expect(asyncFn).toHaveBeenCalledTimes(21);
        expect(onFailureAsync).toHaveBeenCalledTimes(20);
    });

    it('should stop when onFailureAsync throws error', async () => {
        const asyncFn = vi.fn().mockRejectedValue('AsyncFn Error');
        const onFailureAsync = vi.fn().mockRejectedValue('onFailureAsync Error'); // would retry infinitely
        try {
            await asyncRetry<void>({
                asyncFn,
                onFailureAsync
            });
        } catch (e) {
            expect(e).toBe('onFailureAsync Error');
        }
        expect(asyncFn).toHaveBeenCalledTimes(1);
        expect(onFailureAsync).toHaveBeenCalledTimes(1);
    });

});

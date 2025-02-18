import {vi} from 'vitest';
import {HttpClientFactory} from '../../index';

describe('[E2E] Http', () => {

    it('should get contributors from this github repo', async () => {
        const github = HttpClientFactory.createHttpClient('https://api.github.com');
        const collaborators = await github.get('/repos/burst-apps-team/phoenix/contributors');
        expect(collaborators.status).toBe(200);
        expect(collaborators.response.length).toBeGreaterThan(1);
    });

    it('should get contributors with some additional _global_ options from this github repo', async () => {

        const customOptions = {
            validateStatus: vi.fn((status) => true)
        };

        const github = HttpClientFactory.createHttpClient('https://api.github.com', customOptions);
        const collaborators = await github.get('/repos/burst-apps-team/phoenix/contributors');
        expect(collaborators.status).toBe(200);
        expect(collaborators.response.length).toBeGreaterThan(1);
        expect(customOptions.validateStatus).toHaveBeenCalledTimes(1);
        expect(customOptions.validateStatus).toHaveBeenCalledWith(200);
    });

    it('should get contributors with some additional options from this github repo', async () => {

        const customOptions = {
            validateStatus: vi.fn((status) => true)
        };

        const github = HttpClientFactory.createHttpClient('https://api.github.com');
        const collaborators = await github.get('/repos/burst-apps-team/phoenix/contributors', customOptions);
        expect(collaborators.status).toBe(200);
        expect(collaborators.response.length).toBeGreaterThan(1);
        expect(customOptions.validateStatus).toHaveBeenCalledTimes(1);
        expect(customOptions.validateStatus).toHaveBeenCalledWith(200);
    });

    it('should get not found error from this github repo', async () => {
        try {
            const github = HttpClientFactory.createHttpClient('https://api.github.com');
            await github.get('/repos/burst-apps-team/phoenix/no-valid-resource');
            expect(true).toBe('Exception expected');
        } catch (error) {
            expect(error.status).toBe(404);
            expect(error.message).toBe('Not Found');
            expect(error.timestamp).not.toBeNull();
            expect(error.requestUrl).toBe('/repos/burst-apps-team/phoenix/no-valid-resource');
        }

    });

});

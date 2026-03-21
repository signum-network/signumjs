import {describe, it, expect, vi, beforeEach, afterEach} from "vitest"
import {MobileWallet, MobileWalletError} from '../mobile';
import {src22} from '@signumjs/standards';

describe('MobileWallet', () => {
    let windowOpenSpy: any;
    let originalWindow: any;
    let originalProcess: any;

    beforeEach(() => {
        // Save originals
        originalWindow = global.window;
        originalProcess = (global as any).process;

        // Setup window mock
        windowOpenSpy = vi.fn();
        global.window = {
            open: windowOpenSpy,
            location: {
                search: ''
            }
        } as any;

        // Remove process to simulate browser environment by default
        delete (global as any).process;
    });

    afterEach(() => {
        // Restore originals
        if (originalWindow) {
            global.window = originalWindow;
        }
        if (originalProcess) {
            (global as any).process = originalProcess;
        }
        vi.restoreAllMocks();
    });

    describe('constructor', () => {
        it('should set openInBrowser to true by default', () => {
            const wallet = new MobileWallet();
            wallet.connect({
                callbackUrl: 'https://myapp.com/connected',
                appName: 'TestApp',
                network: 'mainnet'
            });
            expect(windowOpenSpy).toHaveBeenCalled();
        });

        it('should respect openInBrowser option when set to false', () => {
            const wallet = new MobileWallet({openInBrowser: false});
            wallet.connect({
                callbackUrl: 'https://myapp.com/connected',
                appName: 'TestApp',
                network: 'mainnet'
            });
            expect(windowOpenSpy).not.toHaveBeenCalled();
        });

        it('should respect openInBrowser option when set to true', () => {
            const wallet = new MobileWallet({openInBrowser: true});
            wallet.connect({
                callbackUrl: 'https://myapp.com/connected',
                appName: 'TestApp',
                network: 'mainnet'
            });
            expect(windowOpenSpy).toHaveBeenCalled();
        });

        it('should not open in browser when in NodeJS environment', () => {
            // Mock NodeJS environment
            (global as any).process = {
                versions: {},
                toString: () => '[object process]'
            };

            const wallet = new MobileWallet();
            wallet.connect({
                callbackUrl: 'https://myapp.com/connected',
                appName: 'TestApp',
                network: 'mainnet'
            });
            expect(windowOpenSpy).not.toHaveBeenCalled();
        });
    });

    describe('connect', () => {
        it('should generate correct deeplink for mainnet', () => {
            const wallet = new MobileWallet({openInBrowser: false});
            const deeplink = wallet.connect({
                callbackUrl: 'https://myapp.com/connected',
                appName: 'TestApp',
                network: 'mainnet'
            });

            const parsed = src22.parseDeeplink(deeplink);
            expect(parsed.action).toEqual('connect');
            expect(parsed.decodedPayload).toEqual({
                callbackUrl: 'https://myapp.com/connected',
                appName: 'TestApp',
                network: 'mainnet'
            });
        });

        it('should generate correct deeplink for testnet', () => {
            const wallet = new MobileWallet({openInBrowser: false});
            const deeplink = wallet.connect({
                callbackUrl: 'https://myapp.com/connected',
                appName: 'TestApp',
                network: 'testnet'
            });

            const parsed = src22.parseDeeplink(deeplink);
            expect(parsed.action).toEqual('connect');
            expect(parsed.decodedPayload).toEqual({
                callbackUrl: 'https://myapp.com/connected',
                appName: 'TestApp',
                network: 'testnet'
            });
        });

        it('should open deeplink in browser when openInBrowser is true', () => {
            const wallet = new MobileWallet({openInBrowser: true});
            const deeplink = wallet.connect({
                callbackUrl: 'https://myapp.com/connected',
                appName: 'TestApp',
                network: 'mainnet'
            });

            expect(windowOpenSpy).toHaveBeenCalledWith(deeplink, '_self', 'noopener noreferrer');
        });

        it('should not open deeplink in browser when openInBrowser is false', () => {
            const wallet = new MobileWallet({openInBrowser: false});
            wallet.connect({
                callbackUrl: 'https://myapp.com/connected',
                appName: 'TestApp',
                network: 'mainnet'
            });

            expect(windowOpenSpy).not.toHaveBeenCalled();
        });

        it('should return the deeplink', () => {
            const wallet = new MobileWallet({openInBrowser: false});
            const deeplink = wallet.connect({
                callbackUrl: 'https://myapp.com/connected',
                appName: 'TestApp',
                network: 'mainnet'
            });

            expect(deeplink).toContain('signum://');
        });

        it('should handle callback URLs with query parameters', () => {
            const wallet = new MobileWallet({openInBrowser: false});
            const deeplink = wallet.connect({
                callbackUrl: 'https://myapp.com/connected?action=connected&foo=bar',
                appName: 'TestApp',
                network: 'mainnet'
            });

            const parsed = src22.parseDeeplink(deeplink);
            // @ts-ignore
            expect(parsed.decodedPayload.callbackUrl).toEqual('https://myapp.com/connected?action=connected&foo=bar');
        });
    });

    describe('sign', () => {
        it('should generate correct deeplink for mainnet', () => {
            const wallet = new MobileWallet({openInBrowser: false});
            const unsignedTx = '001046c323004c0000000000e1f50500000000000000000000000000000000000000000000000000000000000000000000000000';
            const deeplink = wallet.sign({
                unsignedTransactionBytes: unsignedTx,
                callbackUrl: 'https://myapp.com/signed',
                network: 'mainnet'
            });

            const parsed = src22.parseDeeplink(deeplink);
            expect(parsed.action).toEqual('sign');
            expect(parsed.decodedPayload).toEqual({
                unsignedTransactionBytes: unsignedTx,
                callbackUrl: 'https://myapp.com/signed',
                network: 'mainnet'
            });
        });

        it('should generate correct deeplink for testnet', () => {
            const wallet = new MobileWallet({openInBrowser: false});
            const unsignedTx = '001046c323004c0000000000e1f50500000000000000000000000000000000000000000000000000000000000000000000000000';
            const deeplink = wallet.sign({
                unsignedTransactionBytes: unsignedTx,
                callbackUrl: 'https://myapp.com/signed',
                network: 'testnet'
            });

            const parsed = src22.parseDeeplink(deeplink);
            expect(parsed.action).toEqual('sign');
            expect(parsed.decodedPayload).toEqual({
                unsignedTransactionBytes: unsignedTx,
                callbackUrl: 'https://myapp.com/signed',
                network: 'testnet'
            });
        });

        it('should open deeplink in browser when openInBrowser is true', () => {
            const wallet = new MobileWallet({openInBrowser: true});
            const unsignedTx = '001046c323004c0000000000e1f50500000000000000000000000000000000000000000000000000000000000000000000000000';
            const deeplink = wallet.sign({
                unsignedTransactionBytes: unsignedTx,
                callbackUrl: 'https://myapp.com/signed',
                network: 'mainnet'
            });

            expect(windowOpenSpy).toHaveBeenCalledWith(deeplink, '_self');
        });

        it('should not open deeplink in browser when openInBrowser is false', () => {
            const wallet = new MobileWallet({openInBrowser: false});
            const unsignedTx = '001046c323004c0000000000e1f50500000000000000000000000000000000000000000000000000000000000000000000000000';
            wallet.sign({
                unsignedTransactionBytes: unsignedTx,
                callbackUrl: 'https://myapp.com/signed',
                network: 'mainnet'
            });

            expect(windowOpenSpy).not.toHaveBeenCalled();
        });

        it('should return the deeplink', () => {
            const wallet = new MobileWallet({openInBrowser: false});
            const unsignedTx = '001046c323004c0000000000e1f50500000000000000000000000000000000000000000000000000000000000000000000000000';
            const deeplink = wallet.sign({
                unsignedTransactionBytes: unsignedTx,
                callbackUrl: 'https://myapp.com/signed',
                network: 'mainnet'
            });

            expect(deeplink).toContain('signum://');
        });

        it('should handle callback URLs with query parameters', () => {
            const wallet = new MobileWallet({openInBrowser: false});
            const unsignedTx = '001046c323004c0000000000e1f50500000000000000000000000000000000000000000000000000000000000000000000000000';
            const deeplink = wallet.sign({
                unsignedTransactionBytes: unsignedTx,
                callbackUrl: 'https://myapp.com/signed?action=signed&foo=bar',
                network: 'mainnet'
            });

            const parsed = src22.parseDeeplink(deeplink);
            // @ts-ignore
            expect(parsed.decodedPayload.callbackUrl).toEqual('https://myapp.com/signed?action=signed&foo=bar');
        });
    });

    describe('parseConnectCallback', () => {
        it('should parse publicKey and status from URL parameters', () => {
            global.window.location.search = '?publicKey=abc123def456&status=success';
            const data = MobileWallet.parseConnectCallback();

            expect(data.publicKey).toEqual('abc123def456');
            expect(data.status).toEqual('success');
        });

        it('should throw when no parameters present', () => {
            global.window.location.search = '';

            expect(() => MobileWallet.parseConnectCallback()).toThrow(MobileWalletError);
        });

        it('should throw when publicKey is missing', () => {
            global.window.location.search = '?status=success';

            expect(() => MobileWallet.parseConnectCallback()).toThrow('No public key found');
        });

        it('should throw when status is missing', () => {
            global.window.location.search = '?publicKey=abc123';

            expect(() => MobileWallet.parseConnectCallback()).toThrow('No status found');
        });

        it('should throw when status is invalid', () => {
            global.window.location.search = '?publicKey=abc123&status=invalid';

            expect(() => MobileWallet.parseConnectCallback()).toThrow('Invalid status');
        });

        it('should handle multiple URL parameters and extract publicKey', () => {
            global.window.location.search = '?foo=bar&publicKey=abc123&status=success&baz=qux';
            const data = MobileWallet.parseConnectCallback();

            expect(data.publicKey).toEqual('abc123');
            expect(data.status).toEqual('success');
        });

        it('should parse rejected status', () => {
            global.window.location.search = '?publicKey=abc123&status=rejected';
            const data = MobileWallet.parseConnectCallback();

            expect(data.status).toEqual('rejected');
        });

        it('should parse failed status', () => {
            global.window.location.search = '?publicKey=abc123&status=failed';
            const data = MobileWallet.parseConnectCallback();

            expect(data.status).toEqual('failed');
        });

        it('should throw when window is undefined (NodeJS)', () => {
            delete (global as any).window;

            expect(() => MobileWallet.parseConnectCallback()).toThrow('window is undefined');
        });
    });

    describe('parseSignCallback', () => {
        it('should parse status and transactionId from URL parameters', () => {
            global.window.location.search = '?status=success&transactionId=xyz789';
            const data = MobileWallet.parseSignCallback();

            expect(data.status).toEqual('success');
            expect(data.transactionId).toEqual('xyz789');
        });

        it('should parse status=rejected without transactionId', () => {
            global.window.location.search = '?status=rejected';
            const data = MobileWallet.parseSignCallback();

            expect(data.status).toEqual('rejected');
            expect(data.transactionId).toBeUndefined();
        });

        it('should parse status=failed without transactionId', () => {
            global.window.location.search = '?status=failed';
            const data = MobileWallet.parseSignCallback();

            expect(data.status).toEqual('failed');
            expect(data.transactionId).toBeUndefined();
        });

        it('should throw when no parameters present', () => {
            global.window.location.search = '';

            expect(() => MobileWallet.parseSignCallback()).toThrow(MobileWalletError);
        });

        it('should throw when status is missing', () => {
            global.window.location.search = '?foo=bar';

            expect(() => MobileWallet.parseSignCallback()).toThrow('No status found');
        });

        it('should throw when status is invalid', () => {
            global.window.location.search = '?status=invalid';

            expect(() => MobileWallet.parseSignCallback()).toThrow('Invalid status');
        });

        it('should handle multiple URL parameters', () => {
            global.window.location.search = '?foo=bar&status=success&transactionId=abc123&baz=qux';
            const data = MobileWallet.parseSignCallback();

            expect(data.status).toEqual('success');
            expect(data.transactionId).toEqual('abc123');
        });

        it('should throw when window is undefined (NodeJS)', () => {
            delete (global as any).window;

            expect(() => MobileWallet.parseSignCallback()).toThrow('window is undefined');
        });
    });
});

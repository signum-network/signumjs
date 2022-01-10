import {DeeplinkableWallet} from '../deeplinkable';
import {Amount, parseDeeplink} from '@signumjs/util';

describe('DeeplinkableWallet', () => {
    describe('pay', () => {
        it('should return the deeplink as expected with default values', async () => {
            const wallet = new DeeplinkableWallet();
            const link = await wallet.pay({to: '16107620026796983538'});
            const decodedLink = decodeURIComponent(link.replace(wallet.redirectProxy, ''));
            const parsed = parseDeeplink(decodedLink);
            expect(parsed.action).toEqual('pay');
            expect(parsed.decodedPayload).toEqual({
                recipient: '16107620026796983538',
                amountPlanck: '0',
                feePlanck: '735000',
                messageIsText: true,
                immutable: false,
                deadline: 1440,
                encrypt: false
            });
        });
        it('should return the deeplink as expected with text message', async () => {
            const wallet = new DeeplinkableWallet();
            const link = await wallet.pay({
                to: '16107620026796983538',
                amount: 1,
                fee: 0.01,
                encrypt: true,
                readonly: true,
                message: 'Some Text Message',
                deadline: 100
            });
            const decodedLink = decodeURIComponent(link.replace(wallet.redirectProxy, ''));
            const parsed = parseDeeplink(decodedLink);
            expect(parsed.action).toEqual('pay');
            expect(parsed.decodedPayload).toEqual({
                recipient: '16107620026796983538',
                amountPlanck: Amount.fromSigna(1).getPlanck(),
                feePlanck: Amount.fromSigna(0.01).getPlanck(),
                message: 'Some Text Message',
                messageIsText: true,
                immutable: true,
                deadline: 100,
                encrypt: true
            });
        });
        it('should return the deeplink as expected with binary message', async () => {
            const wallet = new DeeplinkableWallet();
            const link = await wallet.pay({
                to: '16107620026796983538',
                amount: 1,
                fee: 0.01,
                encrypt: false,
                readonly: true,
                hexMessage: 'DEADBEEF',
                deadline: 100
            });
            const decodedLink = decodeURIComponent(link.replace(wallet.redirectProxy, ''));
            const parsed = parseDeeplink(decodedLink);
            expect(parsed.action).toEqual('pay');
            expect(parsed.decodedPayload).toEqual({
                recipient: '16107620026796983538',
                amountPlanck: Amount.fromSigna(1).getPlanck(),
                feePlanck: Amount.fromSigna(0.01).getPlanck(),
                message: 'DEADBEEF',
                messageIsText: false,
                immutable: true,
                deadline: 100,
                encrypt: false
            });
        });
        it('should reject on wrong address', async () => {
            const wallet = new DeeplinkableWallet();
            let hasThrown = false;
            try {
                await wallet.pay({
                    to: 'invalidaddress'
                });
            } catch (e) {
                hasThrown = true;
            }
            expect(hasThrown).toBeTruthy();
        });
        it('should use an custom redirect proxy', async () => {
            const wallet = new DeeplinkableWallet({
                redirectProxy: 'https://redirect.io?url='
            });
            const link = await wallet.pay({
                to: '16107620026796983538'
            });
            expect(link.startsWith('https://redirect.io?url=signum')).toBeTruthy();
        });
    });
});

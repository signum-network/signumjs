import {describe, it, expect} from "vitest"

import {DesktopWallet} from '../desktop';
import {Amount} from '@signumjs/util';
import {src22} from '@signumjs/standards';
import {Address} from '@signumjs/core';

describe('DesktopWallet', () => {
    describe('pay', () => {
        it('should return the deeplink as expected with default values', async () => {
            const wallet = new DesktopWallet();
            const link = await wallet.pay({recipient: Address.create('16107620026796983538')});
            const decodedLink = decodeURIComponent(link);
            const parsed = src22.parseDeeplink(decodedLink);
            expect(parsed.action).toEqual('pay');
            expect(parsed.decodedPayload).toEqual({
                recipient: '16107620026796983538',
                amountPlanck: '0',
                feePlanck: '1000000',
                messageIsText: true,
                immutable: false,
                deadline: 1440,
                encrypt: false
            });
        });
        it('should return the deeplink as expected with text message', async () => {
            const wallet = new DesktopWallet();
            const link = await wallet.pay({
                recipient: Address.create('16107620026796983538'),
                amount: Amount.fromSigna(1),
                fee: Amount.fromSigna(0.01),
                encrypt: true,
                readonly: true,
                message: 'Some Text Message',
                deadline: 100
            });
            const decodedLink = decodeURIComponent(link.replace(wallet.redirectProxy, ''));
            const parsed = src22.parseDeeplink(decodedLink);
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
            const wallet = new DesktopWallet();
            const link = await wallet.pay({
                recipient: Address.create('16107620026796983538'),
                amount: Amount.fromSigna(1),
                fee: Amount.fromSigna(0.01),
                encrypt: false,
                readonly: true,
                hexMessage: 'DEADBEEF',
                deadline: 100
            });
            const decodedLink = decodeURIComponent(link.replace(wallet.redirectProxy, ''));
            const parsed = src22.parseDeeplink(decodedLink);
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
    });
});

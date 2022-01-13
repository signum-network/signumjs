import {DeeplinkableWallet} from './DeeplinkableWallet';
import {Address, composeApi} from '@signumjs/core';

export * from './GenericDeeplinkableWallet';
export * from './DeeplinkableWallet';

            // just do this in your DApp
            async function pay(to: string, amount: number): Promise<void> {
                const ledger = composeApi({nodeHost: 'http://localhost:6876'});
                const from = Address.create('TS-XXXX-XXXX-XXXX-XXXXX');
                const wallet = new DeeplinkableWallet(ledger, from);
                // will open the payment form of the desktop or mobile wallet
                await wallet.pay({
                    to,
                    amount,
                });
            }

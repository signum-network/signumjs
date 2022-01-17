/**
 * Original work Copyright (c) 2020 Madfish Solutions
 * Modified work Copyright (c) 2022 Signum Network
 */

import {v4 as uuid} from 'uuid';
import {ExtensionAdapter} from './extensionAdapter';
import {
    ExtensionMessageType,
    ExtensionPermission,
    ExtensionRequest,
    ExtensionResponse,
    PageMessage,
    PageMessageType
} from '../typings/messaging';
import {RequestPermissionArgs, RequestSignArgs, RequestTransactionArgs} from '../typings';
import {createError} from './errors';
import {TransactionId} from '@signumjs/core';


// TODO: check how our implementation works
function permissionsAreEqual(
    aPerm: ExtensionPermission,
    bPerm: ExtensionPermission
) {
    if (aPerm === null) {
        return bPerm === null;
    }
    return aPerm.pkh === bPerm?.pkh && aPerm.rpc === bPerm?.rpc;
}

/**
 * Extension Adapter for Browser based wallet access, to use with [[GenericExtensionWallet]]
 *
 * Use this adapter, if you want to use the [[GenericExtensionWallet]] in the browser.
 *
 * @module wallets
 */
export class BrowserExtensionAdapter implements ExtensionAdapter {

    private send(msg: PageMessage) {
        window.postMessage(msg, '*');
    }

    private assertResponse(condition: boolean): asserts condition {
        if (!condition) {
            throw new Error('Invalid response received');
        }
    }


    async isWalletAvailable(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            const handleMessage = (evt: MessageEvent) => {
                if (
                    evt.source === window &&
                    evt.data?.type === PageMessageType.Response &&
                    evt.data?.payload === 'PONG'
                ) {
                    done(true);
                }
            };

            const done = (result: boolean) => {
                resolve(result);
                window.removeEventListener('message', handleMessage);
                clearTimeout(t);
            };

            this.send({
                type: PageMessageType.Request,
                payload: 'PING',
            });
            window.addEventListener('message', handleMessage);
            const t = setTimeout(() => done(false), 2_000);
        });
    }

    onAvailabilityChange(callback: (available: boolean) => void) {
        let t: any;
        let currentStatus = false;
        const check = async (attempt = 0) => {
            const initial = attempt < 5;
            const available = await this.isWalletAvailable();
            if (currentStatus !== available) {
                callback(available);
                currentStatus = available;
            }
            t = setTimeout(
                check,
                available ? 10_000 : !initial ? 5_000 : 0,
                initial ? attempt + 1 : attempt
            );
        };
        check();
        return () => clearTimeout(t);

    }

    async getCurrentPermission(): Promise<ExtensionPermission> {
        const res = await this.request({
            type: ExtensionMessageType.GetCurrentPermissionRequest,
        });
        this.assertResponse(
            res.type === ExtensionMessageType.GetCurrentPermissionResponse
        );
        return res.permission;
    }

    onPermissionChange(callback: (permission: ExtensionPermission) => void) {
        let t: any;
        let currentPerm: ExtensionPermission = null;
        const check = async () => {
            try {
                const perm = await this.getCurrentPermission();
                if (!permissionsAreEqual(perm, currentPerm)) {
                    callback(perm);
                    currentPerm = perm;
                }
            } catch {
            }

            t = setTimeout(check, 10_000);
        };
        check();
        return () => clearTimeout(t);
    }

    request(payload: ExtensionRequest): Promise<ExtensionResponse> {
        return new Promise<ExtensionResponse>((resolve, reject) => {
            const reqId = uuid();
            const handleMessage = (evt: MessageEvent) => {
                const res = evt.data as PageMessage;
                if (evt.source !== window || res?.reqId !== reqId) {
                    return;
                } else if (res?.type === PageMessageType.Response) {
                    resolve(res.payload);
                    window.removeEventListener('message', handleMessage);
                } else if (res?.type === PageMessageType.ErrorResponse) {
                    reject(createError(res.payload));
                    window.removeEventListener('message', handleMessage);
                }
            };
            this.send({
                type: PageMessageType.Request,
                payload,
                reqId,
            });

            window.addEventListener('message', handleMessage);
        });
    }

    async requestPermission(args: RequestPermissionArgs): Promise<ExtensionPermission> {
        const res = await this.request({
            type: ExtensionMessageType.PermissionRequest,
            network: args.network || 'mainnet',
            force: args.force,
            appMeta: args.appMeta,
        });
        this.assertResponse(res.type === ExtensionMessageType.PermissionResponse);
        return {
            rpc: res.rpc,
            pkh: res.pkh,
            publicKey: res.publicKey,
        };
    }

    async requestSign(args: RequestSignArgs): Promise<TransactionId> {
        const res = await this.request({
            type: ExtensionMessageType.SignRequest,
            sourcePkh: args.accountId,
            payload: args.unsignedTransaction,
        });
        this.assertResponse(res.type === ExtensionMessageType.SignResponse);
        return {
            transaction: res.transactionId,
            fullHash: res.fullHash
        };
    }

    requestTransaction(args: RequestTransactionArgs): Promise<any> {
        return Promise.resolve(undefined);
    }

}

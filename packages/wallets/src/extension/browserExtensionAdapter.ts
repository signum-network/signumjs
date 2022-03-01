/**
 * Original work Copyright (c) 2020 Madfish Solutions
 * Modified work Copyright (c) 2022 Signum Network
 */

import {v4 as uuid} from 'uuid';
import {ExtensionAdapter} from './extensionAdapter';
import {
    ExtensionMessageType,
    ExtensionNotification,
    ExtensionNotificationType,
    ExtensionPermission,
    ExtensionRequest,
    ExtensionResponse,
    ExtensionSigned,
    PageMessage,
    PageMessageType
} from '../typings/messaging';
import {RequestPermissionArgs, RequestSignArgs, RequestTransactionArgs} from '../typings';
import {createError} from './errors';
import {ExtensionListener} from './extensionListener';


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
            const t = setTimeout(() => done(false), 1_000);
        });
    }

    public onNotification(callback: (message: ExtensionNotification) => void): ExtensionListener {
        let listener: ExtensionListener;
        function handleMessage(evt: MessageEvent) {
            callback(evt.data);
        }

        window.addEventListener('message', handleMessage);
        listener = {
            unlisten: () => { window.removeEventListener('message', handleMessage); }
        };
        return listener;
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
            network: args.network,
            force: args.force,
            appMeta: args.appMeta,
        });
        this.assertResponse(res.type === ExtensionMessageType.PermissionResponse);
        return {
            nodeHosts: res.nodeHosts,
            accountId: res.accountId,
            publicKey: res.publicKey,
        };
    }

    async requestSign(args: RequestSignArgs): Promise<ExtensionSigned> {
        const res = await this.request({
            type: ExtensionMessageType.SignRequest,
            sourcePkh: args.accountId,
            payload: args.unsignedTransaction,
        });
        this.assertResponse(res.type === ExtensionMessageType.SignResponse);
        return {
            transactionId: res.transactionId,
            fullHash: res.fullHash
        };
    }

    requestTransaction(args: RequestTransactionArgs): Promise<any> {
        return Promise.resolve(undefined);
    }

}

/**
 * Original work Copyright (c) 2020 Madfish Solutions
 * Modified work Copyright (c) 2022 Signum Network
 */

import {v4 as uuid} from 'uuid';
import {ExtensionAdapter} from './extensionAdapter';
import {
    ExtensionErrorType,
    ExtensionMessageType,
    ExtensionNotification,
    ExtensionPermission, ExtensionRequestArgs,
    ExtensionResponse,
    ExtensionSigned,
    PageMessage,
    PageMessageType
} from './messaging';
import {createError} from './errors';
import {ExtensionListener} from './extensionListener';
import {RequestPermissionArgs, RequestSignArgs} from './args';


/**
 * Extension Adapter for Browser based wallet access, to use with [[GenericExtensionWallet]]
 *
 * @note This adapter is automatically chosen in browser environments - Usually, you won't use this adapter directly.
 * @module wallets
 */
export class BrowserExtensionAdapter implements ExtensionAdapter {

    private static send(msg: PageMessage) {
        window.postMessage(msg, '*');
    }

    private static assertResponse(condition: boolean): asserts condition {
        if (!condition) {
            throw new Error('Invalid response received');
        }
    }

    /**
     * Asserts that a compatible extension wallet is available
     * @throws Exception if no wallet was found
     */
    async assertWalletAvailable(): Promise<void> {
        return new Promise((resolve, reject) => {
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
                window.removeEventListener('message', handleMessage);
                clearTimeout(t);
                if (result) {
                    resolve();
                } else {
                    reject(createError(ExtensionErrorType.NotFound));
                }
            };

            window.addEventListener('message', handleMessage);
            BrowserExtensionAdapter.send({
                type: PageMessageType.Request,
                payload: 'PING',
            });
            const t = setTimeout(() => done(false), 1_000);
        });
    }

    /**
     * Informs about extension wallet events, like network/node changes, permission and/or account removals
     * @param callback The callback object with the event handler
     * @return The listener object, that can/should be used to unsubscribe if not needed anymore
     */
    public onNotification(callback: (message: ExtensionNotification) => void): ExtensionListener {
        let listener: ExtensionListener;
        function handleMessage(evt: MessageEvent) {
            if (
                evt.source === window
                && evt.origin === location.origin
                && typeof(evt.data.type) === 'string'
                && evt.data.type.startsWith('XT_DAPP_')
            ) {
                callback(evt.data);
            }
        }

        window.addEventListener('message', handleMessage);
        listener = {
            unlisten: () => { window.removeEventListener('message', handleMessage); }
        };
        return listener;
    }

    /**
     * Gets the current permission
     * @return The extensions permission object
     */
    async getCurrentPermission(): Promise<ExtensionPermission> {
        const res = await this.request({
            type: ExtensionMessageType.GetCurrentPermissionRequest,
        });
        BrowserExtensionAdapter.assertResponse(
            res.type === ExtensionMessageType.GetCurrentPermissionResponse
        );
        return res.permission;
    }


    /**
     * Generic request method, to request various operations
     * @param payload The payload object for the respective operation
     * @return The response from the wallet in case of success
     * @throws An error object in case of failures, see also [[ExtensionWalletError]]
     */
    request(payload: ExtensionRequestArgs): Promise<ExtensionResponse> {
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
            BrowserExtensionAdapter.send({
                type: PageMessageType.Request,
                payload,
                reqId,
            });

            window.addEventListener('message', handleMessage);
        });
    }

    /**
     * Requests the permission of a compatible wallet.
     * A permission is based on _one_ network, e.g. Signum, Signum-TESTNET, etc. and the url of the requesting application.
     * The wallet should have selected a node of the required network, otherwise permission request fails with [[InvalidNetworkError]]
     * @param args The argument object
     */
    async requestPermission(args: RequestPermissionArgs): Promise<ExtensionPermission> {
        const res = await this.request({
            type: ExtensionMessageType.PermissionRequest,
            network: args.network,
            appMeta: args.appMeta,
        });
        BrowserExtensionAdapter.assertResponse(res.type === ExtensionMessageType.PermissionResponse);
        return {
            currentNodeHost: res.currentNodeHost,
            availableNodeHosts: res.availableNodeHosts,
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
        BrowserExtensionAdapter.assertResponse(res.type === ExtensionMessageType.SignResponse);
        return {
            transactionId: res.transactionId,
            fullHash: res.fullHash
        };
    }

}

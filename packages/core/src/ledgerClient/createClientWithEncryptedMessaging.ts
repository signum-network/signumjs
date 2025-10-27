/**
 * Factory for creating a full ledger client with encrypted messaging
 * @module core
 */

import {ChainService} from '../service';
import {ApiComposer} from '../api/apiComposer';
import {FullLedger} from '../typings/ledgerClientTypes';
import {LedgerSettings} from './ledgerClientFactory';

// Import all factories including encrypted messaging
import * as accountFactories from '../api/factories/account';
import * as blockFactories from '../api/factories/block';
import * as networkFactories from '../api/factories/network';
import * as transactionFactories from '../api/factories/transaction';
import * as assetFactories from '../api/factories/asset';
import * as contractFactories from '../api/factories/contract';
import * as aliasFactories from '../api/factories/alias';

// Import full message API including encrypted messaging
import {sendMessage, sendEncryptedMessage} from '../api/factories/message';

/**
 * Creates a full ledger client with encrypted messaging support
 *
 * This client includes all operations, including encrypted messaging which requires
 * the Pako compression library. Only use this if you specifically need encrypted messaging.
 * For most applications, use {@link createClient} instead.
 *
 * Dependencies: crypto/sign + crypto/encryption (with Pako compression)
 * Bundle size: ~170-180 KB (including Pako)
 *
 * Use this for: Messaging applications, private communication tools
 *
 * @param settings The ledger settings
 * @returns A full ledger client with encrypted messaging
 *
 * @example
 * ```typescript
 * import {createClientWithEncryptedMessaging} from '@signumjs/core/createClientWithEncryptedMessaging';
 *
 * const ledger = createClientWithEncryptedMessaging({
 *     nodeHost: 'https://europe.signum.network'
 * });
 *
 * // All standard operations available
 * const account = await ledger.account.getAccount({accountId: '12345'});
 *
 * // Plus encrypted messaging
 * await ledger.message.sendEncryptedMessage({
 *     message: 'Secret message',
 *     recipientId: '12345',
 *     recipientPublicKey: 'recipient-public-key',
 *     senderPublicKey: 'your-public-key',
 *     senderAgreementKey: 'your-agreement-key'
 * });
 * ```
 */
export function createClientWithEncryptedMessaging(settings: LedgerSettings): FullLedger {
    const service = new ChainService(settings);

    return ApiComposer
        .create(service)
        .withAccountApi(accountFactories)
        .withBlockApi(blockFactories)
        .withNetworkApi(networkFactories)
        .withTransactionApi(transactionFactories)
        .withAssetApi(assetFactories)
        .withContractApi(contractFactories)
        .withAliasApi(aliasFactories)
        .withMessageApi({
            sendMessage,
            sendEncryptedMessage,  // Includes encrypted messaging (pulls in Pako)
        })
        .compose() as FullLedger;
}

/**
 * Factory for creating a standard ledger client (without encrypted messaging)
 * @module core
 */

import {ChainService} from '../service';
import {ApiComposer} from '../api/apiComposer';
import {StandardLedger} from '../typings/ledgerClientTypes';
import {LedgerSettings} from './ledgerClientFactory';

// Import all factories except encrypted messaging
import * as accountFactories from '../api/factories/account';
import * as blockFactories from '../api/factories/block';
import * as networkFactories from '../api/factories/network';
import * as transactionFactories from '../api/factories/transaction';
import * as assetFactories from '../api/factories/asset';
import * as contractFactories from '../api/factories/contract';
import * as aliasFactories from '../api/factories/alias';

// Import only sendMessage (NOT sendEncryptedMessage)
// Direct import to avoid loading sendEncryptedMessage from message/index
import {sendMessage} from '../api/factories/message/sendMessage';

/**
 * Creates a standard ledger client (without encrypted messaging)
 *
 * This is the recommended default client for most applications.
 * It includes all read and write operations, including transaction signing and plain text messaging,
 * but excludes encrypted messaging to avoid bundling the Pako compression library.
 *
 * Dependencies: crypto/sign (no Pako)
 * Bundle size: ~40-50 KB (including crypto/sign)
 *
 * Use this for: Wallets, payment applications, asset trading, most dApps
 *
 * @param settings The ledger settings
 * @returns A standard ledger client
 *
 * @example
 * ```typescript
 * import {createClient} from '@signumjs/core/createClient';
 *
 * const ledger = createClient({
 *     nodeHost: 'https://europe.signum.network'
 * });
 *
 * // Read operations
 * const account = await ledger.account.getAccount({accountId: '12345'});
 *
 * // Write operations (requires private key)
 * const result = await ledger.transaction.sendAmountToSingleRecipient({
 *     recipientId: '12345',
 *     amountPlanck: '100000000',
 *     senderPublicKey: 'your-public-key',
 *     senderPrivateKey: 'your-private-key'
 * });
 *
 * // Plain text messaging (no encryption)
 * await ledger.message.sendMessage({
 *     message: 'Hello!',
 *     recipientId: '12345',
 *     senderPublicKey: 'your-public-key',
 *     senderPrivateKey: 'your-private-key'
 * });
 * ```
 */
export function createClient(settings: LedgerSettings): StandardLedger {
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
            sendMessage,  // Plain text only - no encrypted messaging
        })
        .compose() as StandardLedger;
}

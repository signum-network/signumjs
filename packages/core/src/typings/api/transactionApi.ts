import {TransactionId} from '../transactionId';
import {Transaction} from '../transaction';
import {Subscription} from '../subscription';
import {UnconfirmedTransactionList} from '../unconfirmedTransactionList';
import {
    CancelSubscriptionArgs,
    CreateSubscriptionArgs, GetSubscriptionPaymentsArgs,
    SendAmountArgs,
    SendAmountToMultipleRecipientsArgs,
    SendSameAmountToMultipleRecipientsArgs,
    UnsignedTransactionArgs
} from '../args';
import {UnsignedTransaction} from '../unsignedTransaction';
import {DistributionAmount} from '../distributionAmount';
import {TransactionList} from '../transactionList';

/**
 * Transaction API
 *
 * This module provides methods related to blockchain transactions
 *
 * @example Usage
 *
 * ```ts
 * const client = LedgerClientFactory.createClient({nodehost: "https://europe.signum.network" })
 * const account = await client.transaction.getAccount( { accountId: '7661432345798605326' })
 *
 * @category api
 */
export interface TransactionApi {

    /**
     * Broadcasts a transaction to the network/blockchain
     *
     * @param signedTransactionPayload The _signed_ transaction payload encoded in base64
     * @return The Transaction Id or Unsigned Bytes as Hex String if no private key was sent
     */
    broadcastTransaction: (signedTransactionPayload: string) => Promise<TransactionId>;

    /**
     * Get a transaction and its details from the network/blockchain
     *
     * @param transactionId The transaction Id
     * @return The Transaction
     */
    getTransaction: (transactionId: string) => Promise<Transaction>;


    /**
     * Get a transaction using the hash reference instead of the id
     *
     * @param fullhash The transactions full hash
     * @return The Transaction
     */
    getTransactionByFullHash: (fullHash: string) => Promise<Transaction>;


    /**
     * Parses a transaction byte sequence to its JSON representation
     *
     * @param transactionHexBytes The transaction byte sequence in hexadecimal format
     * @return The parsed Transaction object
     */
    parseTransactionBytes: (transactionHexBytes: string) => Promise<Transaction>;

    /**
     * Sends a multi-out request to the blockchain with _same_ value for all recipients
     *
     * @param args The argument object
     * @return The Transaction Id or Unsigned Bytes as Hex String if no private key was sent
     */
    sendSameAmountToMultipleRecipients: (args: SendSameAmountToMultipleRecipientsArgs) => Promise<TransactionId | UnsignedTransaction>;

    /**
     * Sends a multi-out request to the blockchain with _arbitrary_ value for each recipient
     *
     *
     * @param args The argument object
     * @return The Transaction Id or Unsigned Bytes as Hex String if no private key was sent
     */
    sendAmountToMultipleRecipients: (args: SendAmountToMultipleRecipientsArgs) => Promise<TransactionId | UnsignedTransaction>;


    /**
     * Sends an amount to another account/recipient
     *
     * @param args The argument object
     * @return The Transaction Id or Unsigned Bytes as Hex String if no private key was sent
     */
    sendAmountToSingleRecipient:
        (args: SendAmountArgs) => Promise<TransactionId | UnsignedTransaction>;

    /**
     * Gets a subscription
     *
     * @param subscriptionId The id of the subscription
     * @return The Subscription Object (as promise)
     */
    getSubscription:
        (subscriptionId: string) => Promise<Subscription>;

    /**
     * Create a subscription
     *
     * @param args The argument object
     * @return The Transaction Id or Unsigned Bytes as Hex String if no private key was sent
     */
    createSubscription:
        (args: CreateSubscriptionArgs) => Promise<TransactionId | UnsignedTransaction>;

    /**
     * Cancels a subscription
     *
     * @param args The argument object
     * @return The Transaction Id or Unsigned Bytes as Hex String if no private key was sent
     */
    cancelSubscription:
        (args: CancelSubscriptionArgs) => Promise<TransactionId | UnsignedTransaction>;

    /**
     * Get the all current unconfirmed transactions
     * @return The UnconfirmedTransactionList of unconfirmed transactions
     */
    getUnconfirmedTransactions: () => Promise<UnconfirmedTransactionList>;

    /**
     * Signs and broadcasts a transaction
     *
     * Usually, you don't need this, as all sending methods in SignumJS sign and broadcast.
     * As not all BRS API functions are implemented yet in SignumJS this method is handy for those,
     * i.e. all direct calls to {@link ChainService.send}
     *
     * @param unsignedTransaction The unsigned Transaction Object (returned by {@link ChainService.send})
     * @return The TransactionId
     */
    signAndBroadcastTransaction: (unsignedTransaction: UnsignedTransactionArgs) => Promise<TransactionId>;


    /**
     * Gets the amount a token holder received from a previous distribution to asset/token holders
     *
     * Distribution to token holders is very efficient at very high transaction rate, so one need explicitely
     * query the node for the underlying amounts of a run distribution.
     *
     * @see {@link AssetApi.distributeToAssetHolders}
     * @param transactionId The transaction Id of the distribution
     * @param accountId The relevant account
     *
     * @return the received income from an asset distribution payment
     */
    getDistributionAmountsFromTransaction: (transactionId: string, accountId: string) => Promise<DistributionAmount>;

    /**
     * Gets the payments from a specific subscription aka Auto-Payment
     *
     * @param args argument object
     *
     * @return a list of transactions which belong to the given subscription
     * */
    getSubscriptionPayments: (args: GetSubscriptionPaymentsArgs) => Promise<TransactionList>;
}

import {Asset} from '../asset';
import {AssetList} from '../assetList';
import {
    CancelOrderArgs,
    IssueAssetArgs,
    PlaceOrderArgs,
    GetAssetHoldersArgs,
    TransferAssetArgs,
    GetAssetTransfersArgs,
    GetAssetTransfersPerAssetArgs,
    GetAssetTransfersPerAccountArgs,
    AddAssetTreasuryAccountArgs,
    DistributeToAssetHoldersArgs,
    GetAssetTradesArgs,
    GetAssetTradesPerAssetArgs,
    GetAssetTradesPerAccountArgs,
    GetAssetArgs,
    MintAssetArgs,
    GetAssetOpenOrdersArgs,
    GetAssetOpenOrdersPerAccountArgs,
    GetAssetOpenOrdersPerAssetArgs,
    GetTradeHistoryPerAccountArgs,
    GetAssetsByNameArgs, GetAssetsByIssuerArgs, TransferMultipleAssetsArgs, TransferAssetOwnershipArgs, CalculateDistributionFeeArgs
} from '../args';
import {TransactionId} from '../transactionId';
import {UnsignedTransaction} from '../unsignedTransaction';
import {AssetAccountList} from '../assetAccountList';
import {AssetTransferList} from '../assetTransferList';
import {AssetTradeList} from '../assetTradeList';
import {GetAllTradesArgs} from '../args/getAllTradesArgs';
import {AssetBidOrderList} from '../assetBidOrderList';
import {AssetAskOrderList} from '../assetAskOrderList';
import {TradeHistory} from '../tradeHistory';
import {GetAllAssetsArgs} from '../args/getAllAssetsArgs';
import {DistributionFee} from '../distributionFee';

/**
 * Asset API
 *
 * The Asset API provides all functions for Asset/Token operations
 *
 * @category api
 * */
export interface AssetApi {

    /**
     * Get asset information by its id
     * @param args The arguments object
     * @return {Promise<Asset>} The asset, if exists
     */
    getAsset: (args: GetAssetArgs) => Promise<Asset>;


    /**
     * Get all available assets
     * @param args The argument object
     * @return {Promise<Asset>} List of assets
     */
    getAllAssets: (args: GetAllAssetsArgs) => Promise<AssetList>;

    /**
     * Issues assets
     * @param args The argument object
     * @return The Transaction Id or Unsigned Bytes as Hex String if no private key was sent
     */
    issueAsset: (args: IssueAssetArgs) => Promise<TransactionId | UnsignedTransaction>;

    /**
     * Mints assets
     * @param args The argument object
     * @return The Transaction Id or Unsigned Bytes as Hex String if no private key was sent
     */
    mintAsset: (args: MintAssetArgs) => Promise<TransactionId | UnsignedTransaction>;

    /**
     * Transfer assets
     * @param args The argument object
     * @return The Transaction Id or Unsigned Bytes as Hex String if no private key was sent
     */
    transferAsset: (args: TransferAssetArgs) => Promise<TransactionId | UnsignedTransaction>;

    /**
     * Transfer assets ownership
     * @param args The argument object
     * @return The Transaction Id or Unsigned Bytes as Hex String if no private key was sent
     */
    transferAssetOwnership: (args: TransferAssetOwnershipArgs) => Promise<TransactionId | UnsignedTransaction>;

    /**
     * Transfer multiple (2-4) assets in one transaction.
     * @param args The argument object
     * @return The Transaction Id or Unsigned Bytes as Hex String if no private key was sent
     */
    transferMultipleAssets: (args: TransferMultipleAssetsArgs) => Promise<TransactionId | UnsignedTransaction>;

    /**
     * Burns assets, i.e. is de facto a transfer to recipient address '0'
     * @param args The argument object
     * @return The Transaction Id or Unsigned Bytes as Hex String if no private key was sent
     */
    burnAsset: (args: Omit<TransferAssetArgs, 'recipientPublicKey'| 'recipientId'>) => Promise<TransactionId | UnsignedTransaction>;

    /**
     * Place Ask Order
     * @param args The argument object
     * @return The Transaction Id or Unsigned Bytes as Hex String if no private key was sent
     */
    placeAskOrder: (args: PlaceOrderArgs) => Promise<TransactionId | UnsignedTransaction>;

    /**
     * Place Ask Order
     * @param args The argument object
     * @return The Transaction Id or Unsigned Bytes as Hex String if no private key was sent
     */
    placeBidOrder: (args: PlaceOrderArgs) => Promise<TransactionId | UnsignedTransaction>;

    /**
     * Cancel Ask Order
     * @param args The argument object
     * @return The Transaction Id or Unsigned Bytes as Hex String if no private key was sent
     */
    cancelAskOrder: (args: CancelOrderArgs) => Promise<TransactionId | UnsignedTransaction>;

    /**
     * Cancel Bid Order
     * @param args The argument object
     * @return The Transaction Id or Unsigned Bytes as Hex String if no private key was sent
     */
    cancelBidOrder: (args: CancelOrderArgs) => Promise<TransactionId | UnsignedTransaction>;

    /**
     * Search for asset trades
     * @param args The argument object
     * @return The list of asset trades
     */
    getAllTrades: (args: GetAllTradesArgs) => Promise<AssetTradeList>;


    /**
     * Get all accounts that holds the fiven asset
     * @param args The argument object
     * @return The list of asset accounts
     */
    getAssetHolders: (args: GetAssetHoldersArgs) => Promise<AssetAccountList>;

    /**
     * Get all asset transfers by accountId and/or assetId
     * @see also {@link AssetApi.getAssetTransfersPerAsset} or {@link AssetApi.getAssetTransfersPerAccount}
     * @param args The argument object
     * @return The list of asset transfers
     * @throws Error if not at least assetId or accountId was giveb
     */
    getAssetTransfers: (args: GetAssetTransfersArgs) => Promise<AssetTransferList>;

    /**
     * A convenience function to get all asset transfers by assetId
     * @see also {@link AssetApi.getAssetTransfers}
     * @param args The argument object
     * @return The list of asset transfers
     */
    getAssetTransfersPerAsset: (args: GetAssetTransfersPerAssetArgs) => Promise<AssetTransferList>;

    /**
     * A convenience function to get all asset transfers by accountId
     * @see also {@link AssetApi.getAssetTransfers}
     * @param args The argument object
     * @return The list of asset transfers
     */
    getAssetTransfersPerAccount: (args: GetAssetTransfersPerAccountArgs) => Promise<AssetTransferList>;

    /**
     * Get all asset trades by accountId and/or assetId
     * @see also {@link AssetApi.getAssetTradesPerAsset} or {@link AssetApi.getAssetTradesPerAccount}
     * @param args The argument object
     * @return The list of asset trades
     * @throws Error if not at least assetId or accountId was giveb
     */
    getAssetTrades: (args: GetAssetTradesArgs) => Promise<AssetTradeList>;

    /**
     * A convenience function to get all asset transfers by assetId
     * @see also {@link AssetApi.getAssetTrades}
     * @param args The argument object
     * @return The list of asset trades
     */
    getAssetTradesPerAsset: (args: GetAssetTradesPerAssetArgs) => Promise<AssetTradeList>;

    /**
     * A convenience function to get all asset transfers by accountId
     * @see also {@link AssetApi.getAssetTrades}
     * @param args The argument object
     * @return The list of asset trades
     */
    getAssetTradesPerAccount: (args: GetAssetTradesPerAccountArgs) => Promise<AssetTradeList>;

    /**
     * Adds/Marks an account as treasury account for a given asset
     *
     * Treasury Accounts are excluded from distributions for token/asset holders.
     *
     * @param args
     * @return The transaction object
     * @throws Error in case of unsuccessful transaction
     */
    addAssetTreasuryAccount: (args: AddAssetTreasuryAccountArgs) => Promise<TransactionId | UnsignedTransaction>;

    /**
     * Distributes Signa and/or another asset to the holders of a given asset.
     * Just pass the total amount to be distributed and it will be sent/distributed proportionally
     * (at very high transaction rate, i.e. 5K TPS) to all holders.
     *
     * To inspect the share a token holder received you need to use {@link TransactionApi.getDistributionAmountsFromTransaction}
     *
     * To calculate the fees upfront use {@link AssetApi.calculateDistributionFee}.
     *
     * @param args The distribution args object
     * @throws Error in case of unsuccessful transaction
     */
    distributeToAssetHolders: (args: DistributeToAssetHoldersArgs) => Promise<TransactionId | UnsignedTransaction>;

    /**
     * Gets all open Bid Orders
     * @param args The query object
     * @return A list of bid orders
     */
    getOpenBidOrders: (args: GetAssetOpenOrdersArgs) => Promise<AssetBidOrderList>;

    /**
     * Gets all open Ask Orders
     * @param args The query object
     * @return A list of ask orders
     */
    getOpenAskOrders: (args: GetAssetOpenOrdersArgs) => Promise<AssetAskOrderList>;

    /**
     * Gets all open Bid Orders per account
     * @param args The query object
     * @return A list of bid orders
     */
    getOpenBidOrdersPerAccount: (args: GetAssetOpenOrdersPerAccountArgs) => Promise<AssetBidOrderList>;

    /**
     * Gets all open Ask Orders
     * @param args The query object
     * @return A list of ask orders
     */
    getOpenAskOrdersPerAccount: (args: GetAssetOpenOrdersPerAccountArgs) => Promise<AssetAskOrderList>;

    /**
     * Gets all open Bid Orders per asset
     * @param args The query object
     * @return A list of bid orders
     */
    getOpenBidOrdersPerAsset: (args: GetAssetOpenOrdersPerAssetArgs) => Promise<AssetBidOrderList>;

    /**
     * Gets all open Ask Orders per asset
     * @param args The query object
     * @return A list of ask orders
     */
    getOpenAskOrdersPerAsset: (args: GetAssetOpenOrdersPerAssetArgs) => Promise<AssetAskOrderList>;

    /**
     * The trade history is a journal about open/filled and/or cancelled trades for a given account and
     * optionally set asset
     *
     * @param {GetTradeHistoryPerAccountArgs} args The args object
     *
     * @return The trade history
     */
    getTradeHistoryPerAccount: (args: GetTradeHistoryPerAccountArgs) => Promise<TradeHistory>;

    /**
     * Gets all assets by given issuer. So, if an ownership was transferred the asset won't be listed by this call.
     *
     * @param {GetAssetsByIssuerArgs} args The args object
     *
     * @return The asset list
     */
    getAssetsByIssuer: (args: GetAssetsByIssuerArgs) => Promise<AssetList>;

    /**
     * Gets all assets by given owner. So, if an ownership was transferred this new owner is considered byt this call.
     *
     * @param {GetAssetsByIssuerArgs} args The args object
     *
     * @return The asset list
     */
    getAssetsByOwner: (args: GetAssetsByIssuerArgs) => Promise<AssetList>;

    /**
     * Gets all assets by name (or parts of it)
     *
     * @param {GetAssetsByNameArgs} args The args object
     *
     * @return The asset list
     */
    getAssetsByName: (args: GetAssetsByNameArgs) => Promise<AssetList>;

    /**
     * Calculates the fee for {@link AssetApi.distributeToAssetHolders}
     *
     * @param {GetAssetsByNameArgs} args The args object
     *
     * @return The fee object with amount of eligible asset holders
     */
    calculateDistributionFee: (args: CalculateDistributionFeeArgs) => Promise<DistributionFee>;
}

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
    DistributeToAssetHoldersArgs, GetAssetTradesArgs, GetAssetTradesPerAssetArgs, GetAssetTradesPerAccountArgs, GetAssetArgs
} from '../args';
import {TransactionId} from '../transactionId';
import {UnsignedTransaction} from '../unsignedTransaction';
import {AssetAccountList} from '../assetAccountList';
import {AssetTransferList} from '../assetTransferList';
import {AssetTradeList} from '../assetTradeList';
import {GetAllTradesArgs} from '../args/getAllTradesArgs';

/**
 * Asset API
 *
 * Work in progress
 *
 * @module core.api
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
     * @param {number?} firstIndex The first index of range to be returned (begins with 0)
     * @param {number?} lastIndex The first index of range to be returned (max is 500)
     * @return {Promise<Asset>} List of assets
     */
    getAllAssets: (
        firstIndex?: number,
        lastIndex?: number,
    ) => Promise<AssetList>;

    /**
     * Issues assets
     * @param args The argument object
     * @return The Transaction Id or Unsigned Bytes as Hex String if no private key was sent
     */
    issueAsset: (args: IssueAssetArgs) => Promise<TransactionId | UnsignedTransaction>;

    /**
     * Transfer assets
     * @param args The argument object
     * @return The Transaction Id or Unsigned Bytes as Hex String if no private key was sent
     */
    transferAsset: (args: TransferAssetArgs) => Promise<TransactionId | UnsignedTransaction>;

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
     * @returnThe Transaction Id or Unsigned Bytes as Hex String if no private key was sent
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
     * @see also [[AssetApi.getAssetTransfersPerAsset]] or [[AssetApi.getAssetTransfersPerAccount]]
     * @param args The argument object
     * @return The list of asset transfers
     * @throws Error if not at least assetId or accountId was giveb
     */
    getAssetTransfers: (args: GetAssetTransfersArgs) => Promise<AssetTransferList>;

    /**
     * A convenience function to get all asset transfers by assetId
     * @see also [[AssetApi.getAssetTransfers]]
     * @param args The argument object
     * @return The list of asset transfers
     */
    getAssetTransfersPerAsset: (args: GetAssetTransfersPerAssetArgs) => Promise<AssetTransferList>;

    /**
     * A convenience function to get all asset transfers by accountId
     * @see also [[AssetApi.getAssetTransfers]]
     * @param args The argument object
     * @return The list of asset transfers
     */
    getAssetTransfersPerAccount: (args: GetAssetTransfersPerAccountArgs) => Promise<AssetTransferList>;

    /**
     * Get all asset trades by accountId and/or assetId
     * @see also [[AssetApi.getAssetTradesPerAsset]] or [[AssetApi.getAssetTradesPerAccount]]
     * @param args The argument object
     * @return The list of asset trades
     * @throws Error if not at least assetId or accountId was giveb
     */
    getAssetTrades: (args: GetAssetTradesArgs) => Promise<AssetTradeList>;

    /**
     * A convenience function to get all asset transfers by assetId
     * @see also [[AssetApi.getAssetTrades]]
     * @param args The argument object
     * @return The list of asset trades
     */
    getAssetTradesPerAsset: (args: GetAssetTradesPerAssetArgs) => Promise<AssetTradeList>;

    /**
     * A convenience function to get all asset transfers by accountId
     * @see also [[AssetApi.getAssetTrades]]
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
     * (at very high transation rate, i.e. 5K TPS) to all holders.
     *
     * To inspect the share a token holder received you need to use [[TransactionApi.getDistributionAmountsFromTransaction]]
     *
     * @param args The distribution args object
     * @throws Error in case of unsuccessful transaction
     */
    distributeToAssetHolders: (args: DistributeToAssetHoldersArgs) => Promise<TransactionId | UnsignedTransaction>;

}

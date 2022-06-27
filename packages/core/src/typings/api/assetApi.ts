import {Asset} from '../asset';
import {AssetList} from '../assetList';
import {CancelOrderArgs, IssueAssetArgs, PlaceOrderArgs, GetAssetHoldersArgs, TransferAssetArgs} from '../args';
import {TransactionId} from '../transactionId';
import {UnsignedTransaction} from '../unsignedTransaction';
import {AssetAccountList} from '../assetAccountList';

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
     * @param {string} assetId The asset id
     * @return {Promise<Asset>} The asset, if exists
     */
    getAsset: (
        assetId: string,
    ) => Promise<Asset>;


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
     * Get all accounts that holds the fiven asset
     * @param args The argument object
     * @return The list of asset accounts
     */
    getAssetHolders: (args: GetAssetHoldersArgs) => Promise<AssetAccountList>;
}

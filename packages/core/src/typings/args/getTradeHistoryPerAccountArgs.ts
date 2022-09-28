
/**
 * The argument object for [[AssetApi.getTradeHistoryPerAccount]]
 *
 * @module core
 */
export interface GetTradeHistoryPerAccountArgs {
    accountId: string;
    assetId?: string;
    firstIndex?: number;
    lastIndex?: number;
}

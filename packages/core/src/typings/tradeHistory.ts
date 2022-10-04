/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {AssetTrade} from './assetTrade';


/**
 * Journal Entry of [[TradeHistory]]
 * @module core
 */
export interface JournalEntry {
    order: string;
    asset: string;
    account: string;
    accountRS: string;
    quantityQNT: string;
    priceNQT: string;
    height: number;
    name: string;
    decimals: number;
    price: string;
    executedQuantityQNT: string;
    executedVolumeNQT: string;
    type: 'bid' | 'ask';
    status: 'filled' | 'open' | 'cancelled';
    trades: AssetTrade[];
}

/**
 * Trade History
 * @module core
 */
export interface TradeHistory extends Indexable {
    account: string;
    accountRS: string;
    asset: string;
    nextIndex?: number;
    tradeJournal: JournalEntry[];
}

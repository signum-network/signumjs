/**
 * Original work Copyright (c) 2022 Signum Network
 */

import {AssetTransfer} from './assetTransfer';
import {Indexable} from './indexable';

/**
 * Asset Transfer List
 * @module core
 */
export interface AssetTransferList extends Indexable{
    transfers: AssetTransfer[];
    requestProcessingTime: number;
}

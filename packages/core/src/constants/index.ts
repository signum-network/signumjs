import {ApiVersion} from './apiVersion';
import {TransactionType} from './transactionType';
import {TransactionArbitrarySubtype} from './transactionArbitrarySubtype';
import {TransactionAssetSubtype} from './transactionAssetSubtype';
import {TransactionLeasingSubtype} from './transactionLeasingSubtype';
import {TransactionMarketplaceSubtype} from './transactionMarketplaceSubtype';
import {TransactionPaymentSubtype} from './transactionPaymentSubtype';
import {TransactionMiningSubtype} from './transactionMiningSubtype';
import {TransactionEscrowSubtype} from './transactionEscrowSubtype';
import {TransactionSmartContractSubtype} from './transactionSmartContractSubtype';

/**
 * The default deadline (in minutes) for Transactions
 * 
 */
const DefaultDeadline = 1440;

/**
 * The default endpoint for {@link ApiSettings}
 * 
 */
const DefaultApiEndpoint = '/api';


/**
 *
 * Address prefixes used in {@link Address}
 * 
 * */
enum AddressPrefix {
    MainNet = 'S',
    TestNet = 'TS',
}

export {
    ApiVersion,
    AddressPrefix,
    DefaultDeadline,
    DefaultApiEndpoint,
    TransactionType,
    TransactionPaymentSubtype,
    TransactionMarketplaceSubtype,
    TransactionLeasingSubtype,
    TransactionAssetSubtype,
    TransactionArbitrarySubtype,
    TransactionMiningSubtype,
    TransactionEscrowSubtype,
    TransactionSmartContractSubtype
};

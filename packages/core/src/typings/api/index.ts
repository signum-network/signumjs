import {BlockApi} from './blockApi';
import {NetworkApi} from './networkApi';
import {TransactionApi} from './transactionApi';
import {MessageApi} from './messageApi';
import {AccountApi} from './accountApi';
import {AliasApi} from './aliasApi';
import {ContractApi} from './contractApi';
import {AssetApi} from './assetApi';
import {ChainService} from '../../service';

export {
    AccountApi,
    AliasApi,
    AssetApi,
    BlockApi,
    ContractApi,
    MessageApi,
    NetworkApi,
    TransactionApi,
};

/**
 * The API structure returned by {@link LedgerClientFactory} (or older style {@link composeApi})
 *
 * The programming interface uses a _builder pattern_ to mount an API.
 *
 * @example Using recommended LedgerClientFactory
 *
 * ```ts
 * const api = LedgerClientFactory.createClient({
 *   nodeHost: 'https://europe.signum.network', // one of the mainnet nodes
 * })
 * ```

 * @example Using older composeApi style
 *
 * ```ts
 * const api = composeApi({
 *   nodeHost: 'https://europe.signum.network', // one of the mainnet nodes
 * })
 * ```
 *
 * ### Customize API
 *
 * While this is a straightforward way to have access to _all_ API functionality, this methods
 * has the disadvantage of including all needed dependencies, thus leading to a bigger bundle, for those
 * who use bundlers like [webpack](https://webpack.js.org/). To reduce the bundle size, one may mount a subset of the API
 * conforming their needs using the {@link ApiComposer} class.
 *
 * @category api
 */
export class Api {
    /**
     * This leaks the underlying {@link ChainService } instance to interact with the chain nodes API directly, e.g. to use an API method that
     * is not supported by SignumJS yet.
     */
    readonly service: ChainService;
    readonly asset: AssetApi;
    readonly block: BlockApi;
    readonly network: NetworkApi;
    readonly transaction: TransactionApi;
    readonly message: MessageApi;
    readonly account: AccountApi;
    readonly alias: AliasApi;
    readonly contract: ContractApi;
}

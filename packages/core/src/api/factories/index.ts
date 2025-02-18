/**
 * This submodule describes the Factory Methods
 * of the API. You almost will like to use {@link composeApi}
 * or {@link LedgerClientFactory.createClient}
 * rather than using the Factory Methods itself
 *
 * The factory methods are higher-order functions which
 * receives a {@link ChainService} instance in first order, and
 * the payload in second order.
 *
 * `factoryMethod(chainServiceInstance)(methodArgs)`
 *
 * The factory methods are used {@link ApiComposer} and {@link composeApi}
 *
 * */

export * from './account';
export * from './alias';
export * from './asset';
export * from './block';
export * from './contract';
export * from './network';
export * from './message';
export * from './transaction';

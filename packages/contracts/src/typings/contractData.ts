/**
 * Generic Datatype for contracts
 *
 * The data type can only be a numeric as contracts accept only longs.
 * <b>Text is not supported</>
 *
 * @see {@link GenerateMethodCallArgs} and {@link generateMethodCall}
 * @module contracts
 */
export type ContractData = string | number | boolean;

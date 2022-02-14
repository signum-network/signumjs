/**
 * Original work Copyright (c) 2021,2022 Signum Network
 */


interface TransactionSubType {
    readonly value: number;
    readonly description: string;
    readonly minimumFeeConstantNQT: string;
    readonly minimumFeeAppendagesNQT: string;
}

interface TransactionType {
    readonly value: number;
    readonly description: string;
    readonly subtypes: TransactionSubType[];
}

interface PeerState {
    readonly value: string;
    readonly description: string;
}

/**
 * Network Info
 * @module core
 */
export interface NetworkInfo {
    readonly genesisBlockId: string;
    readonly genesisAccountId: number;
    readonly maxBlockPayloadLength: number;
    readonly maxArbitraryMessageLength: number;
    readonly ordinaryTransactionLength: number;
    readonly addressPrefix: string;
    readonly valueSuffix: string;
    readonly blockTime: number;
    readonly decimalPlaces: number;
    readonly networkName: string;
    readonly feeQuantNQT: number;
    readonly transactionTypes: TransactionType[];
    peerStates: PeerState[];
    requestProcessingTime: number;
}

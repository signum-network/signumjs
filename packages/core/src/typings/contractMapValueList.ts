/**
 * Copyright (c) 2022 Signum Network
 */

interface KeyValue {
    key2: string;
    value: string;
}

/**
 * Contract Map Value List
 * @module core
 */
export interface ContractMapValueList {
    keyValues: KeyValue[];
    requestProcessingTime: number;
}

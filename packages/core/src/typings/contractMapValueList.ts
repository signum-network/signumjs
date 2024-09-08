/**
 * Copyright (c) 2022 Signum Network
 */

interface KeyValue {
    key2: string;
    value: string;
}

/**
 * Contract Map Value List
 * @category entities
 */
export interface ContractMapValueList {
    keyValues: KeyValue[];
    requestProcessingTime: number;
}

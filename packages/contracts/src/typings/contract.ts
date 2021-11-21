/**
 * Copyright (c) 2019 Burst Apps Team
 * Copyright (c) 2021 Signum Network
 */

/**
 * The contract interface returned from Signum Node API [[ContractApi.getContract]]
 * @module contracts
 */
export interface Contract {
    creator: string;
    creatorRS: string;
    at: string;
    atRS: string;
    atVersion: number;
    name: string;
    description: string;
    machineCode: string;
    machineCodeHashId: string;
    machineData: string;
    balanceNQT: string;
    prevBalanceNQT: string;
    nextBlock: number;
    frozen: boolean;
    running: boolean;
    stopped: boolean;
    finished: boolean;
    dead: boolean;
    minActivation: string;
    creationBlock: number;
    requestProcessingTime: number;
}

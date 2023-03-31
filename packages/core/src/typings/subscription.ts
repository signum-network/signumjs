
/**
 * Original work Copyright (c) 2020 Burst Apps Team
 * Modified 2023 Signum Network
 */

/**
 * Subscription
 * @module core
 * */
export interface Subscription {
    readonly id: string;
    readonly sender: string;
    readonly senderRS: string;
    readonly recipient: string;
    readonly recipientRS: string;
    readonly amountNQT: string;
    readonly frequency: number;
    readonly timeNext: number;
    readonly requestProcessingTime: number;
    readonly alias?: string;
    readonly aliasName?: string;
    readonly tld?: string;
    readonly tldName?: string;
}


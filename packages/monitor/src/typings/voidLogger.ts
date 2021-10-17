/**
 * Copyright (c) 2020 Burst Apps Team
 */

import {Logger} from './logger';

/**
 * A logger implementation that does absolutely nothing
 *
 * @module monitor
 */
export class VoidLogger implements Logger {
    debug(msg: string): void {
        // This is intentional no op
    }

    error(msg: string): void {
        // This is intentional no op
    }

    log(msg: string): void {
        // This is intentional no op
    }
}

/**
 * A singleton instance of the VoidLogger
 * @module monitor
 */
export const voidLogger = new VoidLogger();

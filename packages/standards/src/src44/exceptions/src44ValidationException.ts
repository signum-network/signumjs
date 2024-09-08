/**
 * Copyright (c) 2022 Signum Network
 */

/**
 *
 * SRC44 Validation Exception
 *
 * @internal
 * 
 */
export class SRC44ValidationException extends Error {
    constructor(message: string) {
        super(`[SRC44 Validation Error]: ${message}`);
    }
}

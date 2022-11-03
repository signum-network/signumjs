export class SRC44ValidationException extends Error {
    constructor(message: string) {
        super(`[SRC44 Validation Error]: ${message}`);
    }
}

export class SRC44ParseException extends Error {
    constructor(message: string) {
        super(`[SRC44 Parse Error]: ${message}`);
    }
}

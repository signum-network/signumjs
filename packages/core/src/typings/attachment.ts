/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */


/**
* Attachment class
*
* The attachment class is used to appended to transaction where appropriate.
* It is a super class for Message and EncryptedMessage.
 * @module core
*/
export class Attachment {
    constructor(public type: string) {}
}

interface AttachmentMessageArgs {
    messageIsText: boolean;
    message: string;
}

/**
* Message class
*
* The Message class is used to model a plain message attached to a transaction.
 * @module core
*/
export class AttachmentMessage extends Attachment {
    public messageIsText: boolean;
    public message: string;

    constructor(data: AttachmentMessageArgs) {
        super('message');
        this.messageIsText = data.messageIsText;
        this.message = data.message;
    }
}

interface AttachmentEncryptedMessageArgs {
    data: string;
    nonce: string;
    isText: boolean;
}

/**
* EncryptedMessage class
*
* The EncryptedMessage class is a model for a encrypted message attached to a transaction.
 * @module core
*/
export class AttachmentEncryptedMessage extends Attachment {
    public data: string;
    public nonce: string;
    public isText: boolean;

    constructor(data: AttachmentEncryptedMessageArgs) {
        super('encrypted_message');
        this.data = data.data;
        this.nonce = data.nonce;
        this.isText = data.isText;
    }
}

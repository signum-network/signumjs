import {createParametersFromAttachment} from '../';
import {AttachmentEncryptedMessage, AttachmentMessage} from '../../typings/attachment';


describe('createParametersFromAttachment', () => {

    it('should construct message attachment', () => {

        const messageAttachment = new AttachmentMessage({
            message: 'message',
            messageIsText: true,
        });

        const params = createParametersFromAttachment(messageAttachment, {foo: 'bar'});
        expect(params).toEqual(
            {message: 'message', messageIsText: 'true', foo: 'bar'}
        );

    });

    it('should construct encrypted message attachment', () => {

        const encryptedMessageAttachment = new AttachmentEncryptedMessage({
            data: 'data',
            isText: true,
            nonce: 'nonce'
        });

        const params = createParametersFromAttachment(encryptedMessageAttachment, {foo: 'bar'});
        expect(params).toEqual(
            {
                encryptedMessageData: 'data',
                encryptedMessageNonce: 'nonce',
                messageToEncryptIsText: 'true',
                foo: 'bar',
            }
        );

    });

    it('should throw error on unknown attachment type', () => {

        const unknownAttachment = { type: 'unknown' };

        try {
            createParametersFromAttachment(unknownAttachment, {foo: 'bar'});
            expect(false).toBe('Expect exception');
        } catch (e) {
            expect(e.message).toContain('Unknown attachment type');
        }

    });
});

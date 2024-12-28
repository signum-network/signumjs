import {loadEnvironment} from './helpers/environment';
import {ChainService} from '../../../service/chainService';
import {decryptMessage, generateMasterKeys, getAccountIdFromPublicKey, SignKeys} from '@signumjs/crypto';
import {getTransaction} from '../../factories/transaction/getTransaction';
import {isAttachmentVersion} from '../../../attachment';
import {sendEncryptedMessage, sendMessage} from '../../factories/message';
import {FeeQuantPlanck} from '@signumjs/util';
import {TransactionId} from '../../../typings/transactionId';


describe('[E2E] Message Api', () => {

    let environment;
    let service;
    let senderKeys: SignKeys;
    let recipientKeys;
    let recipientId;

    beforeAll(() => {
        environment = loadEnvironment();
        service = new ChainService({
            nodeHost: environment.testNetHost,
            apiRootUrl: environment.testNetApiPath
        });
        vi.setTimeout(environment.timeout);

        senderKeys = generateMasterKeys(environment.testPassphrase);
        recipientKeys = generateMasterKeys(environment.testRecipientPassphrase);
        recipientId = getAccountIdFromPublicKey(recipientKeys.publicKey);
    });


    it('should sendMessage with recipientPublicKey', async () => {

        const transactionId = await sendMessage(service)({
            message: '[E2E] sendMessage TEST',
            senderPublicKey: senderKeys.publicKey,
            senderPrivateKey: senderKeys.signPrivateKey,
            feePlanck: '' + FeeQuantPlanck,
            recipientId,
            recipientPublicKey: recipientKeys.publicKey,
            deadline: 1440,
        }) as TransactionId;

        expect(transactionId).not.toBeUndefined();

        const transaction = await getTransaction(service)(transactionId.transaction);
        expect(isAttachmentVersion(transaction, 'PublicKeyAnnouncement')).toBeTruthy();

    });

    it('should sendMessage with messageIsText false', async () => {

        const transactionId = await sendMessage(service)({
            message: '436f6e76657274656420746f20486578',
            senderPublicKey: senderKeys.publicKey,
            senderPrivateKey: senderKeys.signPrivateKey,
            feePlanck: '' + FeeQuantPlanck,
            recipientId,
            recipientPublicKey: recipientKeys.publicKey,
            deadline: 1440,
            messageIsText: false
        }) as TransactionId;

        expect(transactionId).not.toBeUndefined();

        const transaction = await getTransaction(service)(transactionId.transaction);
        expect(isAttachmentVersion(transaction, 'PublicKeyAnnouncement')).toBeTruthy();

    });


    it('should sendEncryptedTextMessage', async () => {
        const transactionId = await sendEncryptedMessage(service)({
            message : '[E2E] sendEncryptedTextMessage TEST (encrypted)',
            recipientId,
            recipientPublicKey: recipientKeys.publicKey,
            senderAgreementKey: senderKeys.agreementPrivateKey,
            senderPublicKey: senderKeys.publicKey,
            senderPrivateKey: senderKeys.signPrivateKey,
            feePlanck: String(FeeQuantPlanck),
        }) as TransactionId;

        expect(transactionId).not.toBeUndefined();

    });

    it('should get a transaction from BRS with encrypted message and decrypt successfully', async () => {
        const transaction = await getTransaction(service)(environment.testEncryptedMessageTransactionId);
        expect(transaction).not.toBeUndefined();
        isAttachmentVersion(transaction, 'EncryptedMessage');
        const {encryptedMessage} = transaction.attachment;

        const recipientsMessage = decryptMessage(encryptedMessage, transaction.senderPublicKey, recipientKeys.agreementPrivateKey);
        const sendersMessage = decryptMessage(encryptedMessage, recipientKeys.publicKey, senderKeys.agreementPrivateKey);
        expect(recipientsMessage).toEqual('[E2E] sendEncryptedTextMessage TEST (encrypted)');
        expect(recipientsMessage).toEqual(sendersMessage);

    });



});

const {
    isAttachmentVersion,
    TransactionType,
    TransactionArbitrarySubtype, Address
} = require('@signumjs/core');
const {ChainTime} = require('@signumjs/util')
const {api, askAccount, handleApiError, getAccountId} = require('./helper');

const getMessageText = transaction =>
    isAttachmentVersion(transaction, 'EncryptedMessage')
        ? '<encrypted>'
        : transaction.attachment.message;

async function listMessages(account) {
    try {
        const accountId = Address.create(account).getNumericId()

        // here we can explicitly filter by Transaction Types
        const {transactions} = await api.account.getAccountTransactions(
            {
                accountId,
                type: TransactionType.Arbitrary,
                subtype: TransactionArbitrarySubtype.Message
            }
        );

        // now we iterate through the transactions and print in a formatted way
        transactions.forEach(t => {
            console.info(`On ${ChainTime.fromChainTimestamp(t.blockTimestamp).getDate()}`)
            console.info(`From ${t.senderRS}`)
            console.info(`To ${t.recipientRS}`)
            console.info('Message:\n', getMessageText(t), '\n---')
        })

    } catch (e) {
        handleApiError(e)
    }
}

(async () => {
    const {account} = await askAccount();
    await listMessages(account);
})();

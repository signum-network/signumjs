import {convertNQTStringToNumber} from '@signumjs/util';
import {loadEnvironment} from './helpers/environment';
import {getAccountIdFromPassphrase} from './helpers/account';
import {ChainService} from '../../../service/chainService';
import {TransactionType} from '../../../constants/transactionType';
import {TransactionPaymentSubtype} from '../../../constants';
import {
    getAccountBalance,
    getAccountSubscriptions,
    getAccountTransactions,
    getRewardRecipient,
    getUnconfirmedAccountTransactions
} from '../../factories/account';

const environment = loadEnvironment();

vi.setTimeout(environment.timeout);

describe(`[E2E] Account Api`, () => {

    const service = new ChainService({
        nodeHost: environment.testNetHost,
        apiRootUrl: environment.testNetApiPath
    });
    const accountId = getAccountIdFromPassphrase(environment.testPassphrase);

    describe('getAccountTransactions', () => {
        it('should getAccountTransactions', async () => {
            const transactionList = await getAccountTransactions(service)({
                accountId
            });
            expect(transactionList).not.toBeUndefined();
            const {transactions} = transactionList;
            expect(transactions.length).toBeGreaterThan(1);
        });

        it('should getAccountTransactions with MultiOut', async () => {
            const transactionList = await getAccountTransactions(service)({
                    accountId,
                    includeIndirect: true
                }
            );
            expect(transactionList).not.toBeUndefined();
            const {transactions} = transactionList;
            expect(transactions.length).toBeGreaterThan(1);

            const testTransaction = transactions.filter(
                ({type, subtype}) => type === TransactionType.Payment
                    && (subtype === TransactionPaymentSubtype.MultiOut
                        || subtype === TransactionPaymentSubtype.MultiOutSameAmount)
            );
            expect(testTransaction).toBeDefined();
        });

        it('should getAccountTransactions with distributions', async () => {
            const transactionList = await getAccountTransactions(service)({
                accountId: '5016',
                includeIndirect: true,
                resolveDistributions: true
            });
            expect(transactionList).not.toBeUndefined();
            const {transactions} = transactionList;
            expect(transactions.length).toBeGreaterThan(1);
        });

        it('should getAccountTransactions with distributions ignoring sender', async () => {
            const transactionList = await getAccountTransactions(service)({
                accountId: '12237344381764262326',
                resolveDistributions: true
            });
            expect(transactionList).not.toBeUndefined();
            const {transactions} = transactionList;
            expect(transactions.length).toBeGreaterThan(1);
        });

        it('should getAccountTransactions paged', async () => {
            const transactionList = await getAccountTransactions(service)({
                accountId: '13592187744525340181',
                firstIndex: 0,
                lastIndex: 3
            });
            expect(transactionList).not.toBeUndefined();
            const {transactions} = transactionList;
            expect(transactions).toHaveLength(4);
        });

        it('should getAccountTransactions minimum confirmations', async () => {
            const transactionList = await getAccountTransactions(service)({
                accountId: '13592187744525340181',
                numberOfConfirmations: 1440
            });
            expect(transactionList).not.toBeUndefined();
            const {transactions} = transactionList;
            expect(transactions.length).toBeGreaterThanOrEqual(4);
        });
    });

    describe('getUnconfirmedAccountTransactions', () => {
        it('should getUnconfirmedAccountTransactions', async () => {
            const transactionList = await getUnconfirmedAccountTransactions(service)(accountId);
            // e2e cannot guarantee existing unconfirmed transactions...but at least an answer
            expect(transactionList).not.toBeUndefined();
            expect(transactionList.unconfirmedTransactions.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('getAccountBalance', () => {
        it('should getAccountBalance', async () => {
            const balance = await getAccountBalance(service)(accountId);

            const c = convertNQTStringToNumber;
            expect(c(balance.balanceNQT)).toBeGreaterThan(1);
            expect(c(balance.forgedBalanceNQT)).toBeGreaterThanOrEqual(0);
            expect(c(balance.guaranteedBalanceNQT)).toBeGreaterThan(1);
            expect(c(balance.unconfirmedBalanceNQT)).toBeGreaterThan(1);
        });
    });

    describe('getAccountSubscriptions', () => {
        it('should getAccountTransactions', async () => {
            const subscriptionList = await getAccountSubscriptions(service)(accountId);
            expect(subscriptionList).not.toBeUndefined();
            const {subscriptions} = subscriptionList;
            expect(subscriptions.length).toBeGreaterThanOrEqual(0);
            if (subscriptions.length > 0) {
                expect(subscriptions[0].id).toBeDefined();
            }
        });
    });

    describe('getRewardRecipient', () => {
        it('should getRewardRecipient', async () => {
            const response = await getRewardRecipient(service)(accountId);
            expect(response.rewardRecipient.length).toBeGreaterThan(10);
        });
    });

});

import {loadEnvironment} from './helpers/environment';
import {ChainService} from '../../../service/chainService';
import {getContractsByAccount} from '../../factories/contract/getContractsByAccount';
import {getContract} from '../../factories/contract/getContract';
import {getAllContractIds, publishContract, publishContractByReference} from '../../factories/contract';
import {Amount} from '@signumjs/util';
import {generateMasterKeys, getAccountIdFromPublicKey} from '@signumjs/crypto';
import {TransactionId} from '../../../typings/transactionId';

const environment = loadEnvironment();

jest.setTimeout(environment.timeout);

describe('[E2E] Contract Api', () => {

    const service = new ChainService({
        nodeHost: environment.testNetHost,
        apiRootUrl: environment.testNetApiPath
    });

    let senderKeys;
    let recipientKeys;
    let recipientId;

    beforeAll(() => {
        jest.setTimeout(environment.timeout);

        senderKeys = generateMasterKeys(environment.testPassphrase);
        recipientKeys = generateMasterKeys(environment.testRecipientPassphrase);
        recipientId = getAccountIdFromPublicKey(recipientKeys.publicKey);
    });

    it('should getContract', async () => {
        const contract = await getContract(service)(environment.testContractId);
        expect(contract).toBeDefined();
        expect(contract.at).toBe(environment.testContractId);
    });

    it('should getContractsByAccount', async () => {
        const contract = await getContractsByAccount(service)({
            accountId: environment.testContractCreatorId
        });
        expect(contract.ats.length).toBeGreaterThanOrEqual(1);
    });

    it('should getAllContractIds', async () => {
        const contractIdList = await getAllContractIds(service)();
        expect(contractIdList.atIds.length).toBeGreaterThan(0);
    });

    describe('publishContract', () => {
        it('should publishContract', async () => {

            // this is the test contract:
            // https://github.com/signum-network/signum-smartj/blob/master/src/main/java/bt/dapps/SignumArt.java

            const response = await publishContract(service)({
                codeHex: environment.testContractCodeHex,
                feePlanck: '',
                activationAmountPlanck: Amount.fromSigna(10).getPlanck(),
                senderPublicKey: senderKeys.publicKey,
                description: '[E2E] SignumJS publishContract Test',
                name: 'Echo',
            });
            expect(response.unsignedTransactionBytes).toBeDefined();
        });

        it('should publishContract with initial data stack', async () => {

            const Owner = '6502115112683865257';
            const PlatformAddress = '6502115112683865257';
            const PlatformFee = 25;
            const RoyaltiesFee = 50;
            const RoyaltiesOwner = '6502115112683865257';
            const NftTrackerAddress = '2402520554221019656';
            const Status = 1;
            const CurrentPrice = Amount.fromSigna(1000).getPlanck();

            // this is the test contract:
            // https://github.com/signum-network/signum-smartj/blob/master/src/main/java/bt/dapps/SignumArt.java
            const initialData = [
                Owner,
                PlatformAddress,
                PlatformFee,
                RoyaltiesFee,
                RoyaltiesOwner,
                NftTrackerAddress,
                Status,
                CurrentPrice
            ];

            const transactionId = await publishContract(service)({
                codeHex: environment.testContractCodeHex,
                feePlanck: '',
                activationAmountPlanck: Amount.fromSigna(10).getPlanck(),
                senderPublicKey: senderKeys.publicKey,
                description: '[E2E] SignumJS publishContract Test with initial datastack',
                name: 'E2ESignumJS',
                data: initialData
            });
            expect(transactionId.unsignedTransactionBytes).toBeDefined();
        });

        it('should publishContractByReference with initial data stack', async () => {

            const Owner = '6502115112683865257';
            const PlatformAddress = '6502115112683865257';
            const PlatformFee = 25;
            const RoyaltiesFee = 50;
            const RoyaltiesOwner = '6502115112683865257';
            const NftTrackerAddress = '2402520554221019656';
            const Status = 0;

            // this is the test contract:
            // https://github.com/signum-network/signum-smartj/blob/master/src/main/java/bt/dapps/SignumArt.java
            const initialData = [
                Owner,
                PlatformAddress,
                PlatformFee,
                RoyaltiesFee,
                RoyaltiesOwner,
                NftTrackerAddress,
                Status,
            ];

            const transactionId = await publishContractByReference(service)({
                referencedTransactionHash: '874E9938B0B42192EAFD98CE069BAE96E6D6C2F2AFA0221614F926795520FE4A',
                feePlanck: '',
                senderPublicKey: senderKeys.publicKey,
                description: '[E2E] SignumJS publishContractByReference Test with initial datastack',
                name: 'E2ESignumJS',
                data: initialData
            });
            expect(transactionId.unsignedTransactionBytes).toBeDefined();
        });
    });
});

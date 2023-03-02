import {loadEnvironment} from './helpers/environment';
import {ChainService} from '../../../service/chainService';
import {cancelBidOrder, getAllAssets, getAsset, mintAsset, placeBidOrder} from '../../factories/asset';
import {issueAsset} from '../../factories/asset/issueAsset';
import {generateMasterKeys, getAccountIdFromPublicKey} from '@signumjs/crypto';
import {Amount, FeeQuantPlanck} from '@signumjs/util';


describe(`[E2E] Asset Api`, () => {

    let environment;
    let service;
    let senderKeys;
    let recipientKeys;
    let recipientId;

    beforeAll(() => {
        environment = loadEnvironment();
        service = new ChainService({
            nodeHost: environment.testNetHost,
            apiRootUrl: environment.testNetApiPath
        });
        jest.setTimeout(environment.timeout);

        senderKeys = generateMasterKeys(environment.testPassphrase);
        recipientKeys = generateMasterKeys(environment.testRecipientPassphrase);
        recipientId = getAccountIdFromPublicKey(recipientKeys.publicKey);
    });

    it('should getAsset', async () => {
        const asset = await getAsset(service)({assetId: environment.testAssetId});
        expect(asset).not.toBeUndefined();
    });

    it('should getAllAssets', async () => {
        const assetList = await getAllAssets(service)({});
        expect(assetList.assets.length).toBeGreaterThan(0);
    });

    it('should issueAsset (mintable false)', async () => {
        const response = await issueAsset(service)({
            senderPublicKey: senderKeys.publicKey,
            feePlanck: Amount.fromSigna(150).getPlanck(),
            quantity: 50 * 1000,
            decimals: 4,
            name: 'SignumJS',
            description: '[E2E] SignumJS Test Asset',
            mintable: false
        });
        expect(response.unsignedTransactionBytes).toBeDefined();
    });

    it('should issueAsset (mintable true)', async () => {
        const response = await issueAsset(service)({
            senderPublicKey: senderKeys.publicKey,
            feePlanck: Amount.fromSigna(150).getPlanck(),
            quantity: 50 * 1000,
            decimals: 4,
            name: 'SignumJS',
            description: '[E2E] SignumJS Test Asset',
            mintable: true
        });
        expect(response.unsignedTransactionBytes).toBeDefined();
    });

    it('should mintAsset', async () => {
        const response = await mintAsset(service)({
            senderPublicKey: senderKeys.publicKey,
            assetId: environment.testAssetId,
            feePlanck: Amount.fromSigna(.1).getPlanck(),
            quantity: 50 * 1000
        });
        expect(response.unsignedTransactionBytes).toBeDefined();
    });

    it('should placeBidOrder', async () => {
        const response = await placeBidOrder(service)({
            senderPublicKey: senderKeys.publicKey,
            pricePlanck: Amount.fromSigna(1).getPlanck(),
            feePlanck: FeeQuantPlanck + '',
            quantity: 1,
            assetId: '15297368334901195317',
        });

        expect(response.unsignedTransactionBytes).toBeDefined();
    });

    it('should cancelBidOrder', async () => {
        const response = await cancelBidOrder(service)({
            order: '2182927965246408557',
            senderPublicKey: senderKeys.publicKey,
            feePlanck: FeeQuantPlanck + '',
        });
        expect(response.unsignedTransactionBytes).toBeDefined();
    });
});

/* tslint:disable:quotemark */
import {vi, expect, describe, it, afterEach} from "vitest"
import {HttpMockBuilder, Http} from '@signumjs/http';
import {getBlockchainStatus} from '../factories/network/getBlockchainStatus';
import {getAsset} from '../factories/asset/getAsset';
import {
    addAssetTreasuryAccount,
    cancelAskOrder,
    cancelBidOrder,
    distributeToAssetHolders,
    getAssetHolders,
    getAssetTransfers,
    placeAskOrder,
    placeBidOrder,
    transferAsset,
    burnAsset,
    issueAsset,
    mintAsset,
    getOpenBidOrders,
    getOpenAskOrders,
    getOpenBidOrdersPerAsset,
    getOpenAskOrdersPerAsset,
    getOpenBidOrdersPerAccount,
    getOpenAskOrdersPerAccount,
    getAllAssets,
    getAssetsByIssuer,
    getAssetsByName,
    transferMultipleAssets,
    transferAssetOwnership,
    getAssetsByOwner,
} from '../factories';
import {Amount, FeeQuantPlanck} from '@signumjs/util';
import {createChainService} from '../../__tests__/helpers';
import {TransactionId} from '../../typings/transactionId';
import {calculateDistributionFee} from '../factories/asset/calculateDistributionFee';

// mocking
import {signAndBroadcastTransaction} from "../../api/factories/transaction/signAndBroadcastTransaction"
vi.mock('../../api/factories/transaction/signAndBroadcastTransaction', () => {
    return {
        signAndBroadcastTransaction: vi.fn().mockImplementation(() =>
            () => Promise.resolve({ transaction: 'transactionId' })
        ),
    };
});

describe('Asset Api', () => {

    let httpMock: Http;

    afterEach(() => {
        if (httpMock) {
            // @ts-ignore
            httpMock.reset();
        }
        vi.clearAllMocks();
    });

    describe('getAsset', () => {
        it('should getAsset', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, {
                account: 'accountId',
                accountRS: 'BURST-ADDRESS',
                name: 'TestName',
                description: 'Test Description',
                decimals: 0,
                quantityQNT: '100000000000000000',
                asset: 'assetId',
                numberOfTrades: 0,
                numberOfTransfers: 10,
                numberOfAccounts: 100,
            }).build();
            const service = createChainService(httpMock, 'relPath');
            const asset = await getAsset(service)({
                assetId: 'assetId',
                minimumQuantity: '100'
            });
            expect(asset).toEqual({
                account: 'accountId',
                accountRS: 'BURST-ADDRESS',
                name: 'TestName',
                description: 'Test Description',
                decimals: 0,
                quantityQNT: '100000000000000000',
                asset: 'assetId',
                numberOfTrades: 0,
                numberOfTransfers: 10,
                numberOfAccounts: 100,
            });
        });

        it('should fail on getAsset', async () => {
            try {
                httpMock = HttpMockBuilder.create().onGetThrowError(500, 'Internal Server Error').build();
                const service = createChainService(httpMock, 'relPath');
                await getBlockchainStatus(service)();
                expect(true).toBe('Exception expected');
            } catch (error: any) {
                expect(error.status).toBe(500);
            }
        });
    });
    describe('getAllAssets', () => {
        it('should getAllAssets', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, [],
                'relPath?requestType=getAllAssets&skipZeroVolume=true&firstIndex=0&lastIndex=1&heightStart=2&heightEnd=3'
            ).build();
            const service = createChainService(httpMock, 'relPath');
            const assetList = await getAllAssets(service)({
                skipZeroVolume: true,
                firstIndex: 0,
                lastIndex: 1,
                heightStart: 2,
                heightEnd: 3
            });
            expect(assetList).toEqual([]);
        });
    });

    describe('getAssetsByIssuer', () => {
        it('should getAssetsByIssuer', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, [],
                'relPath?requestType=getAssetsByIssuer&account=accountId&firstIndex=0&lastIndex=1&heightStart=2&heightEnd=3&skipZeroVolume=true'
            ).build();
            const service = createChainService(httpMock, 'relPath');
            const assetList = await getAssetsByIssuer(service)({
                accountId: 'accountId',
                skipZeroVolume: true,
                firstIndex: 0,
                lastIndex: 1,
                heightStart: 2,
                heightEnd: 3
            });
            expect(assetList).toEqual([]);
        });
    });

    describe('getAssetsByOwner', () => {
        it('should getAssetsByOwner', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, [],
                'relPath?requestType=getAssetsByOwner&account=accountId&firstIndex=0&lastIndex=1&heightStart=2&heightEnd=3&skipZeroVolume=true'
            ).build();
            const service = createChainService(httpMock, 'relPath');
            const assetList = await getAssetsByOwner(service)({
                accountId: 'accountId',
                skipZeroVolume: true,
                firstIndex: 0,
                lastIndex: 1,
                heightStart: 2,
                heightEnd: 3
            });
            expect(assetList).toEqual([]);
        });
    });

    describe('getAssetsByName', () => {
        it('should getAssetsByName', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, [],
                'relPath?requestType=getAssetsByName&name=name&firstIndex=0&lastIndex=1&heightStart=2&heightEnd=3&skipZeroVolume=true'
            ).build();
            const service = createChainService(httpMock, 'relPath');
            const assetList = await getAssetsByName(service)({
                name: 'name',
                skipZeroVolume: true,
                firstIndex: 0,
                lastIndex: 1,
                heightStart: 2,
                heightEnd: 3
            });
            expect(assetList).toEqual([]);
        });
    });

    describe('placeAskOrder', () => {
        it('should placeAskOrder', async () => {
            httpMock = HttpMockBuilder.create()
                // tslint:disable:max-line-length
                .onPostReply(200, {
                        broadcasted: true,
                        unsignedTransactionBytes: 'unsignedHexMessage'
                    },
                    'relPath?requestType=placeAskOrder&asset=123&priceNQT=1000000000&quantityQNT=100&publicKey=senderPublicKey&feeNQT=1000000&deadline=1440')
                .build();

            const service = createChainService(httpMock, 'relPath');
            const {transaction} = await placeAskOrder(service)({
                feePlanck: FeeQuantPlanck + '',
                assetId: '123',
                quantity: 100,
                pricePlanck: Amount.fromSigna(10).getPlanck(),
                senderPrivateKey: 'senderPrivateKey',
                senderPublicKey: 'senderPublicKey',
                decimals: 0
            }) as TransactionId;

            expect(transaction).toBe('transactionId');
        });
    });

    describe('placeBidOrder', () => {
        it('should placeBidOrder', async () => {
            httpMock = HttpMockBuilder.create()
                // tslint:disable:max-line-length
                .onPostReply(200, {
                        broadcasted: true,
                        unsignedTransactionBytes: 'unsignedHexMessage'
                    },
                    'relPath?requestType=placeBidOrder&asset=123&priceNQT=10000000&quantityQNT=100&publicKey=senderPublicKey&feeNQT=1000000&deadline=1440')
                .build();

            const service = createChainService(httpMock, 'relPath');
            const {transaction} = await placeBidOrder(service)({
                feePlanck: FeeQuantPlanck + '',
                assetId: '123',
                quantity: 100,
                pricePlanck: Amount.fromSigna(10).getPlanck(),
                senderPrivateKey: 'senderPrivateKey',
                senderPublicKey: 'senderPublicKey',
                decimals: 2,
            }) as TransactionId;

            expect(transaction).toBe('transactionId');
        });
    });

    describe('cancelAskOrder', () => {
        it('should cancelAskOrder', async () => {
            httpMock = HttpMockBuilder.create()
                // tslint:disable:max-line-length
                .onPostReply(200, {
                        broadcasted: true,
                        unsignedTransactionBytes: 'unsignedHexMessage'
                    },
                    'relPath?requestType=cancelAskOrder&order=123&publicKey=senderPublicKey&feeNQT=1000000&deadline=1440')
                .build();

            const service = createChainService(httpMock, 'relPath');
            const {transaction} = await cancelAskOrder(service)({
                feePlanck: FeeQuantPlanck + '',
                order: '123',
                senderPrivateKey: 'senderPrivateKey',
                senderPublicKey: 'senderPublicKey'
            }) as TransactionId;

            expect(transaction).toBe('transactionId');
        });
    });

    describe('cancelBidOrder', () => {
        it('should cancelBidOrder', async () => {
            httpMock = HttpMockBuilder.create()
                // tslint:disable:max-line-length
                .onPostReply(200, {
                        broadcasted: true,
                        unsignedTransactionBytes: 'unsignedHexMessage'
                    },
                    'relPath?requestType=cancelBidOrder&order=123&publicKey=senderPublicKey&feeNQT=1000000&deadline=1440')
                .build();

            const service = createChainService(httpMock, 'relPath');
            const {transaction} = await cancelBidOrder(service)({
                feePlanck: FeeQuantPlanck + '',
                order: '123',
                senderPrivateKey: 'senderPrivateKey',
                senderPublicKey: 'senderPublicKey'
            }) as TransactionId;

            expect(transaction).toBe('transactionId');
        });
    });

    describe('transferAsset', () => {
        it('should transferAsset', async () => {
            httpMock = HttpMockBuilder.create()
                .onPostReply(200, {
                        broadcasted: true,
                        unsignedTransactionBytes: 'unsignedHexMessage'
                    },
                    'relPath?requestType=transferAsset&asset=123&quantityQNT=100&publicKey=senderPublicKey&recipient=recipientId&feeNQT=1000000&deadline=1440'
                ).build();

            const service = createChainService(httpMock, 'relPath');
            const {transaction} = await transferAsset(service)({
                assetId: '123',
                feePlanck: FeeQuantPlanck + '',
                quantity: 100,
                recipientId: 'recipientId',
                senderPrivateKey: 'senderPrivateKey',
                senderPublicKey: 'senderPublicKey',
            }) as TransactionId;

            expect(transaction).toBe('transactionId');
        });

        it('should transferAsset with amount', async () => {
            httpMock = HttpMockBuilder.create()
                .onPostReply(200, {
                        broadcasted: true,
                        unsignedTransactionBytes: 'unsignedHexMessage'
                    },
                    'relPath?requestType=transferAsset&asset=123&quantityQNT=100&publicKey=senderPublicKey&recipient=recipientId&feeNQT=1000000&amountNQT=100000000&deadline=1440'
                ).build();

            const service = createChainService(httpMock, 'relPath');
            const {transaction} = await transferAsset(service)({
                assetId: '123',
                feePlanck: FeeQuantPlanck + '',
                quantity: 100,
                recipientId: 'recipientId',
                amountPlanck: "100000000",
                senderPrivateKey: 'senderPrivateKey',
                senderPublicKey: 'senderPublicKey',
            }) as TransactionId;

            expect(transaction).toBe('transactionId');
        });
    });


    describe('transferAssetOwnership', () => {
        it('should transferAssetOwnership', async () => {
            httpMock = HttpMockBuilder.create()
                .onPostReply(200, {
                        broadcasted: true,
                        unsignedTransactionBytes: 'unsignedHexMessage'
                    },
                    'relPath?requestType=transferAssetOwnership&publicKey=senderPublicKey&recipient=recipientId&feeNQT=1000000&deadline=1440&referencedTransactionFullHash=fullHash'
                ).build();

            const service = createChainService(httpMock, 'relPath');
            const {transaction} = await transferAssetOwnership(service)({
                referencedTransactionFullHash: "fullHash",
                feePlanck: FeeQuantPlanck + '',
                recipientId: 'recipientId',
                senderPrivateKey: 'senderPrivateKey',
                senderPublicKey: 'senderPublicKey',
            }) as TransactionId;

            expect(transaction).toBe('transactionId');
        });
    });

    describe('transferMultipleAsset', () => {
        it('should transferMultipleAsset', async () => {
            httpMock = HttpMockBuilder.create()
                .onPostReply(200, {
                        broadcasted: true,
                        unsignedTransactionBytes: 'unsignedHexMessage'
                    },
                    'relPath?requestType=transferAssetMulti&assetIdsAndQuantities=1%3A123%3B2%3A234%3B3%3A345%3B4%3A456&amountNQT=10000000000&publicKey=senderPublicKey&recipient=recipientId&recipientPublicKey=recipientPublicKey&feeNQT=1000000&deadline=1440'
                ).build();

            const service = createChainService(httpMock, 'relPath');
            const {transaction} = await transferMultipleAssets(service)({
                assetQuantities: [
                    {quantity: '123', assetId: '1'},
                    {quantity: '234', assetId: '2'},
                    {quantity: '345', assetId: '3'},
                    {quantity: '456', assetId: '4'},
                ],
                feePlanck: FeeQuantPlanck + '',
                amountPlanck: '10000000000',
                recipientId: 'recipientId',
                recipientPublicKey: 'recipientPublicKey',
                senderPrivateKey: 'senderPrivateKey',
                senderPublicKey: 'senderPublicKey',
            }) as TransactionId;

            expect(transaction).toBe('transactionId');
        });

        it('should throw exception - too few quantities', async () => {
            httpMock = HttpMockBuilder.create()
                .onPostReply(200, {
                        broadcasted: true,
                        unsignedTransactionBytes: 'unsignedHexMessage'
                    },
                    'relPath?requestType=transferAsset&asset=123&quantityQNT=100&publicKey=senderPublicKey&recipient=recipientId&feeNQT=1000000&deadline=1440'
                ).build();

            const service = createChainService(httpMock, 'relPath');
            try {
                const result = await transferMultipleAssets(service)({
                    assetQuantities: [
                        {quantity: '123', assetId: '1'},
                    ],
                    feePlanck: FeeQuantPlanck + '',
                    amountPlanck: '10000000000',
                    recipientId: 'recipientId',
                    senderPrivateKey: 'senderPrivateKey',
                    senderPublicKey: 'senderPublicKey',
                }) as TransactionId;
                expect("should throw error").toBeFalsy()
            } catch (e:any) {
                expect(e.message).toBe('At least 2 asset-quantities are needed');
            }
        });

        it('should throw exception - too many quantities', async () => {
            httpMock = HttpMockBuilder.create()
                .onPostReply(200, {
                        broadcasted: true,
                        unsignedTransactionBytes: 'unsignedHexMessage'
                    },
                    'relPath?requestType=transferAsset&asset=123&quantityQNT=100&publicKey=senderPublicKey&recipient=recipientId&feeNQT=1000000&deadline=1440'
                ).build();

            const service = createChainService(httpMock, 'relPath');
            try {
                const result = await transferMultipleAssets(service)({
                    assetQuantities: [
                        {quantity: '123', assetId: '1'},
                        {quantity: '234', assetId: '2'},
                        {quantity: '234', assetId: '3'},
                        {quantity: '234', assetId: '4'},
                        {quantity: '234', assetId: '5'},
                    ],
                    feePlanck: FeeQuantPlanck + '',
                    amountPlanck: '10000000000',
                    recipientId: 'recipientId',
                    senderPrivateKey: 'senderPrivateKey',
                    senderPublicKey: 'senderPublicKey',
                }) as TransactionId;
                expect('should throw error').toBeFalsy();
            } catch (e: any) {
                expect(e.message).toBe('At maximum 4 asset-quantities are allowed');
            }
        });

        it('should throw exception - duplicated assets', async () => {
            httpMock = HttpMockBuilder.create()
                .onPostReply(200, {
                        broadcasted: true,
                        unsignedTransactionBytes: 'unsignedHexMessage'
                    },
                    'relPath?requestType=transferAsset&asset=123&quantityQNT=100&publicKey=senderPublicKey&recipient=recipientId&feeNQT=1000000&deadline=1440'
                ).build();

            const service = createChainService(httpMock, 'relPath');
            try {
                const result = await transferMultipleAssets(service)({
                    assetQuantities: [
                        {quantity: '123', assetId: '1'},
                        {quantity: '234', assetId: '1'},
                    ],
                    feePlanck: FeeQuantPlanck + '',
                    amountPlanck: '10000000000',
                    recipientId: 'recipientId',
                    senderPrivateKey: 'senderPrivateKey',
                    senderPublicKey: 'senderPublicKey',
                }) as TransactionId;
                expect('should throw error').toBeFalsy();
            } catch (e:any) {
                expect(e.message).toBe('Duplicate assetId found');
            }
        });
    });

    describe('burnAsset', () => {
        it('should burnAsset', async () => {
            httpMock = HttpMockBuilder.create()
                .onPostReply(200, {
                        broadcasted: true,
                        unsignedTransactionBytes: 'unsignedHexMessage'
                    },
                    'relPath?requestType=transferAsset&asset=123&quantityQNT=100&publicKey=senderPublicKey&recipient=0&feeNQT=1000000&deadline=1440'
                ).build();

            const service = createChainService(httpMock, 'relPath');
            const {transaction} = await burnAsset(service)({
                assetId: '123',
                feePlanck: FeeQuantPlanck + '',
                quantity: 100,
                senderPrivateKey: 'senderPrivateKey',
                senderPublicKey: 'senderPublicKey',
            }) as TransactionId;

            expect(transaction).toBe('transactionId');
        });
    });

    describe('issueAsset', () => {
        it('should issueAsset', async () => {
            httpMock = HttpMockBuilder.create()
                .onPostReply(200, {
                        broadcasted: true,
                        unsignedTransactionBytes: 'unsignedHexMessage'
                    },
                    'relPath?requestType=issueAsset&name=assetName&description=description&quantityQNT=100&decimals=2&publicKey=senderPublicKey&feeNQT=1000000&mintable=true&deadline=1440'
                ).build();

            const service = createChainService(httpMock, 'relPath');
            const {transaction} = await issueAsset(service)({
                mintable: true,
                name: 'assetName',
                decimals: 2,
                description: 'description',
                feePlanck: FeeQuantPlanck + '',
                quantity: 100,
                senderPrivateKey: 'senderPrivateKey',
                senderPublicKey: 'senderPublicKey',
            }) as TransactionId;

            expect(transaction).toBe('transactionId');
        });
    });
    describe('mintAsset', () => {
        it('should mintAsset', async () => {
            httpMock = HttpMockBuilder.create()
                .onPostReply(200, {
                        broadcasted: true,
                        unsignedTransactionBytes: 'unsignedHexMessage'
                    },
                    'relPath?requestType=mintAsset&asset=assetId&quantityQNT=100&publicKey=senderPublicKey&feeNQT=1000000&deadline=1440'
                ).build();

            const service = createChainService(httpMock, 'relPath');
            const {transaction} = await mintAsset(service)({
                assetId: 'assetId',
                feePlanck: FeeQuantPlanck + '',
                quantity: 100,
                senderPrivateKey: 'senderPrivateKey',
                senderPublicKey: 'senderPublicKey',
            }) as TransactionId;

            expect(transaction).toBe('transactionId');
        });
    });


    describe('getAssetHolders', () => {
        it('should get assetHolders', async () => {

            httpMock = HttpMockBuilder.create().onGetReply(200, {
                    accountAssets: [
                        {
                            account: '3494634182417345690',
                            accountRS: 'S-SV6U-AS5G-DMA6-5HVZ2',
                            asset: '12402415494995249540',
                            quantityQNT: '291749654538',
                            unconfirmedQuantityQNT: '291749654538'
                        },
                        {
                            account: '16655635797853184825',
                            accountRS: 'S-5ATT-JF5P-Q4H2-GN7BG',
                            asset: '12402415494995249540',
                            quantityQNT: '104492600906',
                            unconfirmedQuantityQNT: '104492600906'
                        },
                        {
                            account: '8952122635653861124',
                            accountRS: 'S-5MS6-5FBY-74H4-9N4HS',
                            asset: '12402415494995249540',
                            quantityQNT: '90317196599',
                            unconfirmedQuantityQNT: '90317196599'
                        }
                    ],
                    requestProcessingTime: 100
                },
                'relPath?requestType=getAssetAccounts&asset=assetId&ignoreTreasury=true&quantityMinimumQNT=1000&firstIndex=0&lastIndex=10'
            ).build();
            const service = createChainService(httpMock, 'relPath');
            const asset = await getAssetHolders(service)({
                assetId: 'assetId',
                ignoreTreasuryAccount: true,
                minimumQuantity: '1000',
                firstIndex: 0,
                lastIndex: 10,
            });
            expect(asset).toEqual({
                accountAssets: [
                    {
                        account: '3494634182417345690',
                        accountRS: 'S-SV6U-AS5G-DMA6-5HVZ2',
                        asset: '12402415494995249540',
                        quantityQNT: '291749654538',
                        unconfirmedQuantityQNT: '291749654538'
                    },
                    {
                        account: '16655635797853184825',
                        accountRS: 'S-5ATT-JF5P-Q4H2-GN7BG',
                        asset: '12402415494995249540',
                        quantityQNT: '104492600906',
                        unconfirmedQuantityQNT: '104492600906'
                    },
                    {
                        account: '8952122635653861124',
                        accountRS: 'S-5MS6-5FBY-74H4-9N4HS',
                        asset: '12402415494995249540',
                        quantityQNT: '90317196599',
                        unconfirmedQuantityQNT: '90317196599'
                    }
                ],
                requestProcessingTime: 100
            });
        });
        describe('getAssetTransfers', () => {
            it('should get asset transfers', async () => {

                httpMock = HttpMockBuilder.create().onGetReply(200, {
                        'transfers': [
                            {
                                'assetTransfer': '17238227294019155298',
                                'asset': '12402415494995249540',
                                'sender': '11224962117215913721',
                                'senderRS': 'S-Y3RT-LCYX-ZZ4F-BMSKR',
                                'recipient': '9595904932667603984',
                                'recipientRS': 'S-6H2J-Q9P3-QZU3-A2WCC',
                                'quantityQNT': '40161',
                                'height': 1029448,
                                'timestamp': 248521579,
                                'name': 'TRT',
                                'decimals': 4
                            },
                            {
                                'assetTransfer': '3873444853174166315',
                                'asset': '12402415494995249540',
                                'sender': '11224962117215913721',
                                'senderRS': 'S-Y3RT-LCYX-ZZ4F-BMSKR',
                                'recipient': '17256042864802223939',
                                'recipientRS': 'S-8PU5-KWJR-FM67-G9GYY',
                                'quantityQNT': '40161',
                                'height': 1028434,
                                'timestamp': 248277954,
                                'name': 'TRT',
                                'decimals': 4
                            }],
                        requestProcessingTime: 100
                    },
                    'relPath?requestType=getAssetTransfers&asset=assetId&account=accountId&includeAssetInfo=true&firstIndex=0&lastIndex=10'
                ).build();
                const service = createChainService(httpMock, 'relPath');
                const asset = await getAssetTransfers(service)({
                    assetId: 'assetId',
                    accountId: 'accountId',
                    firstIndex: 0,
                    lastIndex: 10,
                });
                expect(asset).toEqual({
                    'transfers': [
                        {
                            'assetTransfer': '17238227294019155298',
                            'asset': '12402415494995249540',
                            'sender': '11224962117215913721',
                            'senderRS': 'S-Y3RT-LCYX-ZZ4F-BMSKR',
                            'recipient': '9595904932667603984',
                            'recipientRS': 'S-6H2J-Q9P3-QZU3-A2WCC',
                            'quantityQNT': '40161',
                            'height': 1029448,
                            'timestamp': 248521579,
                            'name': 'TRT',
                            'decimals': 4
                        },
                        {
                            'assetTransfer': '3873444853174166315',
                            'asset': '12402415494995249540',
                            'sender': '11224962117215913721',
                            'senderRS': 'S-Y3RT-LCYX-ZZ4F-BMSKR',
                            'recipient': '17256042864802223939',
                            'recipientRS': 'S-8PU5-KWJR-FM67-G9GYY',
                            'quantityQNT': '40161',
                            'height': 1028434,
                            'timestamp': 248277954,
                            'name': 'TRT',
                            'decimals': 4
                        }],
                    requestProcessingTime: 100
                });
            });
        });


        describe('addAssetTreasuryAccount', () => {
            it('should addAssetTreasuryAccount', async () => {
                httpMock = HttpMockBuilder.create()
                    .onPostReply(200, {
                            broadcasted: true,
                            unsignedTransactionBytes: 'unsignedHexMessage'
                        },
                        'relPath?requestType=addAssetTreasuryAccount&recipient=accountId&publicKey=senderPublicKey&referencedTransactionFullHash=hash&feeNQT=1000000&deadline=1440'
                    ).build();

                const service = createChainService(httpMock, 'relPath');
                const {transaction} = await addAssetTreasuryAccount(service)({
                    accountId: 'accountId',
                    feePlanck: FeeQuantPlanck + '',
                    senderPrivateKey: 'senderPrivateKey',
                    senderPublicKey: 'senderPublicKey',
                    referencedTransactionFullHash: 'hash',
                }) as TransactionId;

                expect(transaction).toBe('transactionId');
            });
        });

        describe('distributeToAssetHolders', () => {
            it('should distributeToAssetHolders', async () => {
                httpMock = HttpMockBuilder.create()
                    .onPostReply(200, {
                            broadcasted: true,
                            unsignedTransactionBytes: 'unsignedHexMessage'
                        },
                        'relPath?requestType=distributeToAssetHolders&asset=assetId&quantityMinimumQNT=1000&amountNQT=totalAmount&assetToDistribute=otherAssetId&quantityQNT=qnty&feeNQT=1000000&deadline=1440&publicKey=senderPublicKey'
                    ).build();

                const service = createChainService(httpMock, 'relPath');
                const {transaction} = await distributeToAssetHolders(service)({
                    assetId: 'assetId',
                    totalAmountPlanck: 'totalAmount',
                    additionalAssetQuantity: 'qnty',
                    additionalAssetId: 'otherAssetId',
                    minimumHoldQuantity: '1000',
                    feePlanck: FeeQuantPlanck + '',
                    senderPrivateKey: 'senderPrivateKey',
                    senderPublicKey: 'senderPublicKey',
                }) as TransactionId;

                expect(transaction).toBe('transactionId');
            });
        });


        describe('getOpenBidOrders', () => {
            it('should get open bid orders', async () => {
                httpMock = HttpMockBuilder.create()
                    .onGetReply(200, {
                            bidOrders: [
                                {
                                    'order': '12287063733956918204',
                                    'asset': '2742339563614125644',
                                    'account': '5812913123670292755',
                                    'accountRS': 'S-7YAM-Q2DB-UXXS-7XWC3',
                                    'quantityQNT': '1301635506',
                                    'priceNQT': '600',
                                    'height': 1042886,
                                    'type': 'bid'
                                }]
                        },
                        'relPath?requestType=getAllOpenBidOrders&firstIndex=0&lastIndex=100'
                    ).build();

                const service = createChainService(httpMock, 'relPath');
                const result = await getOpenBidOrders(service)({
                    firstIndex: 0,
                    lastIndex: 100,
                });

                expect(result.bidOrders.length).toBe(1);
            });
        });
        describe('getOpenAskOrders', () => {
            it('should get open ask orders', async () => {
                httpMock = HttpMockBuilder.create()
                    .onGetReply(200, {
                            askOrders: [
                                {
                                    'order': '12287063733956918204',
                                    'asset': '2742339563614125644',
                                    'account': '5812913123670292755',
                                    'accountRS': 'S-7YAM-Q2DB-UXXS-7XWC3',
                                    'quantityQNT': '1301635506',
                                    'priceNQT': '600',
                                    'height': 1042886,
                                    'type': 'ask'
                                }]
                        },
                        'relPath?requestType=getAllOpenAskOrders&firstIndex=0&lastIndex=100'
                    ).build();

                const service = createChainService(httpMock, 'relPath');
                const result = await getOpenAskOrders(service)({
                    firstIndex: 0,
                    lastIndex: 100,
                });

                expect(result.askOrders.length).toBe(1);
            });
        });
        describe('getOpenBidOrdersPerAsset', () => {
            it('should get open bid orders', async () => {
                httpMock = HttpMockBuilder.create()
                    .onGetReply(200, {
                            bidOrders: [
                                {
                                    'order': '12287063733956918204',
                                    'asset': '2742339563614125644',
                                    'account': '5812913123670292755',
                                    'accountRS': 'S-7YAM-Q2DB-UXXS-7XWC3',
                                    'quantityQNT': '1301635506',
                                    'priceNQT': '600',
                                    'height': 1042886,
                                    'type': 'bid'
                                }]
                        },
                        'relPath?requestType=getBidOrders&asset=assetId&firstIndex=0&lastIndex=100'
                    ).build();

                const service = createChainService(httpMock, 'relPath');
                const result = await getOpenBidOrdersPerAsset(service)({
                    assetId: 'assetId',
                    firstIndex: 0,
                    lastIndex: 100,
                });

                expect(result.bidOrders.length).toBe(1);
            });
        });
        describe('getOpenAskOrdersPerAsset', () => {
            it('should get open ask orders', async () => {
                httpMock = HttpMockBuilder.create()
                    .onGetReply(200, {
                            askOrders: [
                                {
                                    'order': '12287063733956918204',
                                    'asset': '2742339563614125644',
                                    'account': '5812913123670292755',
                                    'accountRS': 'S-7YAM-Q2DB-UXXS-7XWC3',
                                    'quantityQNT': '1301635506',
                                    'priceNQT': '600',
                                    'height': 1042886,
                                    'type': 'ask'
                                }]
                        },
                        'relPath?requestType=getAskOrders&asset=assetId&firstIndex=0&lastIndex=100'
                    ).build();

                const service = createChainService(httpMock, 'relPath');
                const result = await getOpenAskOrdersPerAsset(service)({
                    assetId: 'assetId',
                    firstIndex: 0,
                    lastIndex: 100,
                });

                expect(result.askOrders.length).toBe(1);
            });
        });
        describe('getOpenBidOrdersPerAccount', () => {
            it('should get open bid orders', async () => {
                httpMock = HttpMockBuilder.create()
                    .onGetReply(200, {
                            bidOrders: [
                                {
                                    'order': '12287063733956918204',
                                    'asset': '2742339563614125644',
                                    'account': '5812913123670292755',
                                    'accountRS': 'S-7YAM-Q2DB-UXXS-7XWC3',
                                    'quantityQNT': '1301635506',
                                    'priceNQT': '600',
                                    'height': 1042886,
                                    'type': 'bid'
                                }]
                        },
                        'relPath?requestType=getAccountCurrentBidOrders&account=accountId&firstIndex=0&lastIndex=100'
                    ).build();

                const service = createChainService(httpMock, 'relPath');
                const result = await getOpenBidOrdersPerAccount(service)({
                    accountId: 'accountId',
                    firstIndex: 0,
                    lastIndex: 100,
                });

                expect(result.bidOrders.length).toBe(1);
            });
            it('should get open bid orders for specific asset', async () => {
                httpMock = HttpMockBuilder.create()
                    .onGetReply(200, {
                            bidOrders: [
                                {
                                    'order': '12287063733956918204',
                                    'asset': '2742339563614125644',
                                    'account': '5812913123670292755',
                                    'accountRS': 'S-7YAM-Q2DB-UXXS-7XWC3',
                                    'quantityQNT': '1301635506',
                                    'priceNQT': '600',
                                    'height': 1042886,
                                    'type': 'bid'
                                }]
                        },
                        'relPath?requestType=getAccountCurrentBidOrders&account=accountId&asset=assetId&firstIndex=0&lastIndex=100'
                    ).build();

                const service = createChainService(httpMock, 'relPath');
                const result = await getOpenBidOrdersPerAccount(service)({
                    assetId: 'assetId',
                    accountId: 'accountId',
                    firstIndex: 0,
                    lastIndex: 100,
                });

                expect(result.bidOrders.length).toBe(1);
            });
        });
        describe('getOpenAskOrdersPerAccount', () => {
            it('should get open ask orders', async () => {
                httpMock = HttpMockBuilder.create()
                    .onGetReply(200, {
                            askOrders: [
                                {
                                    'order': '12287063733956918204',
                                    'asset': '2742339563614125644',
                                    'account': '5812913123670292755',
                                    'accountRS': 'S-7YAM-Q2DB-UXXS-7XWC3',
                                    'quantityQNT': '1301635506',
                                    'priceNQT': '600',
                                    'height': 1042886,
                                    'type': 'ask'
                                }]
                        },
                        'relPath?requestType=getAccountCurrentAskOrders&account=accountId&firstIndex=0&lastIndex=100'
                    ).build();

                const service = createChainService(httpMock, 'relPath');
                const result = await getOpenAskOrdersPerAccount(service)({
                    accountId: 'accountId',
                    firstIndex: 0,
                    lastIndex: 100,
                });

                expect(result.askOrders.length).toBe(1);
            });
            it('should get open ask orders for specific asset', async () => {
                httpMock = HttpMockBuilder.create()
                    .onGetReply(200, {
                            askOrders: [
                                {
                                    'order': '12287063733956918204',
                                    'asset': '2742339563614125644',
                                    'account': '5812913123670292755',
                                    'accountRS': 'S-7YAM-Q2DB-UXXS-7XWC3',
                                    'quantityQNT': '1301635506',
                                    'priceNQT': '600',
                                    'height': 1042886,
                                    'type': 'ask'
                                }]
                        },
                        'relPath?requestType=getAccountCurrentAskOrders&account=accountId&asset=assetId&firstIndex=0&lastIndex=100'
                    ).build();

                const service = createChainService(httpMock, 'relPath');
                const result = await getOpenAskOrdersPerAccount(service)({
                    assetId: 'assetId',
                    accountId: 'accountId',
                    firstIndex: 0,
                    lastIndex: 100,
                });

                expect(result.askOrders.length).toBe(1);
            });
        });

        describe('calculateDistributionFee', () => {
            it('should get correct value for all holders', async () => {
                httpMock = HttpMockBuilder.create()
                    .onGetReply(200, {
                        'numberOfAccounts': 10,
                        },
                        'relPath?requestType=getAsset&asset=1'
                    ).build();

                const service = createChainService(httpMock, 'relPath');
                const result = await calculateDistributionFee(service)({
                    assetId: "1",
                });

                expect(result.numberOfAccounts).toBe(10);
                expect(result.fee.getSigna()).toBe("0.1");
            });

            it('should get correct value for minimum holders', async () => {
                httpMock = HttpMockBuilder.create()
                    .onGetReply(200, {
                        'numberOfAccounts': 23,
                        },
                        'relPath?requestType=getAsset&asset=1&quantityMinimumQNT=100'
                    ).build();

                const service = createChainService(httpMock, 'relPath');
                const result = await calculateDistributionFee(service)({
                    assetId: "1",
                    minimumQuantity: 100
                });

                expect(result.numberOfAccounts).toBe(23);
                expect(result.fee.getSigna()).toBe("0.23");
            });

            it('should get minimum value', async () => {
                httpMock = HttpMockBuilder.create()
                    .onGetReply(200, {
                        'numberOfAccounts': 0,
                        },
                        'relPath?requestType=getAsset&asset=1&quantityMinimumQNT=100'
                    ).build();

                const service = createChainService(httpMock, 'relPath');
                const result = await calculateDistributionFee(service)({
                    assetId: "1",
                    minimumQuantity: 100
                });

                expect(result.numberOfAccounts).toBe(0);
                expect(result.fee.getSigna()).toBe("0.01");
            });
        });
    });
});

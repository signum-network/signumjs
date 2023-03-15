import {verifyTransaction} from '../index';

// Shadow testing
describe('verifyTransaction', function () {

    describe('sendMoney', function () {
        it('should pass verification as expected', () => {
            const requestType = 'sendMoney';
            const formData = {
                recipient: '16107620026796983538',
                amountNQT: '1234567',
                feeNQT: '1000000',
                publicKey: '39101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e',
                deadline: 61
            };
            const testResponse = {
                'broadcasted': false,
                'unsignedTransactionBytes': '0020b610790f3d0039101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20ef2c4339212c389df87d612000000000040420f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004c691000e3bc06eef6805d7454797698cdf6b7e6',
                'transactionJSON': {},
                'requestProcessingTime': 4
            };
            expect(() => {
                verifyTransaction(requestType, formData, testResponse);
            }).not.toThrow();
        });
        it('should throw error. Response is another transaction type', () => {
            const requestType = 'sendMoneyMultiSame';
            const formData = {
                recipients: '7009153596038865357;9285993178362147990',
                amountNQT: '112300000',
                feeNQT: '1000010',
                publicKey: '8c63aaf9d526ac606d85af78a9a71c4ddbfcaacb76805a7f4026cc15b16f1b53',
                deadline: 1
            };
            const testResponse = {
                'broadcasted': false,
                'unsignedTransactionBytes': '0020b610790f3d0039101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20ef2c4339212c389df87d612000000000040420f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004c691000e3bc06eef6805d7454797698cdf6b7e6',
                'transactionJSON': {},
                'requestProcessingTime': 4
            };
            expect(() => {
                verifyTransaction(requestType, formData, testResponse);
            }).toThrow(/^Verification failed/);
        });
        it('should throw error. Response has field changed', () => {
            const requestType = 'sendMoney';
            const formData = {
                recipient: '16107620026796983538',
                amountNQT: '17',
                feeNQT: '1000000',
                publicKey: '39101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e',
                deadline: 61
            };
            const testResponse = {
                'broadcasted': false,
                'unsignedTransactionBytes': '0020b610790f3d0039101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20ef2c4339212c389df87d612000000000040420f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004c691000e3bc06eef6805d7454797698cdf6b7e6',
                'transactionJSON': {},
                'requestProcessingTime': 4
            };
            expect(() => {
                verifyTransaction(requestType, formData, testResponse);
            }).toThrow(/^Verification failed/);
        });
        it('should throw error. Response has more fields', () => {
            const requestType = 'sendMoney';
            const formData = {
                recipient: '16107620026796983538',
                feeNQT: '1000000',
                publicKey: '39101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e',
                deadline: 61
            };
            const testResponse = {
                'broadcasted': false,
                'unsignedTransactionBytes': '0020b610790f3d0039101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20ef2c4339212c389df87d612000000000040420f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004c691000e3bc06eef6805d7454797698cdf6b7e6',
                'transactionJSON': {},
                'requestProcessingTime': 4
            };
            expect(() => {
                verifyTransaction(requestType, formData, testResponse);
            }).toThrow(/^Verification failed/);
        });
        it('should throw error. Response has less fields', () => {
            const requestType = 'sendMoney';
            const formData = {
                recipient: '16107620026796983538',
                amountNQT: '112300000',
                feeNQT: '1000000',
                publicKey: '39101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e',
                referencedTransactionFullHash: '3e13c9047adba9d63001dbb244127cceb6facadb21cccf1236ba269266b3a90a',
                deadline: 61
            };
            const testResponse = {
                'broadcasted': false,
                'unsignedTransactionBytes': '0020b610790f3d0039101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20ef2c4339212c389df87d612000000000040420f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004c691000e3bc06eef6805d7454797698cdf6b7e6',
                'transactionJSON': {},
                'requestProcessingTime': 4
            };
            expect(() => {
                verifyTransaction(requestType, formData, testResponse);
            }).toThrow(/^Verification failed/);
        });
    });

    describe('transferAssetOwnership', function () {

        it('should pass verification as expected', () => {
            const requestType = 'transferAssetOwnership';
            const formData = {
                recipient: '13379979993382958865',
                feeNQT: '15000000000',
                publicKey: '04d794aa453a5bbdb8d580f1d9a76b6d7a25cde0ed38c098550ea0f784d9317a',
                referencedTransactionFullHash: '06d7348a6e1975874339de6e7637ee4de11e21bacfee106686758dd89ac9f710',
                deadline: 20
            };
            const testResponse = {
                'broadcasted': false,
                'unsignedTransactionBytes': '022a5538f60f140004d794aa453a5bbdb8d580f1d9a76b6d7a25cde0ed38c098550ea0f784d9317a11b76cefe93cafb9000000000000000000d6117e0300000006d7348a6e1975874339de6e7637ee4de11e21bacfee106686758dd89ac9f710000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000096cb070077dfcb12bbf713f804cfe1531b543c7c',
                'transactionJSON': {},
                'requestProcessingTime': 4
            };
            expect(() => {
                verifyTransaction(requestType, formData, testResponse);
            }).not.toThrow();
        });
        it('should throw error. Response does not match with request data', () => {
            const requestType = 'transferAssetOwnership';
            const formData = {
                recipient: '13379979993382958865',
                feeNQT: '15000000000',
                publicKey: '04d794aa453a5bbdb8d580f1d9a76b6d7a25cde0ed38c098550ea0f784d9317a',
                referencedTransactionFullHash: '06d7348a6e1975874339de6e7637ee4de11e21bacfee106686758dd89a666666', // different here!
                deadline: 20
            };
            const testResponse = {
                'broadcasted': false,
                'unsignedTransactionBytes': '0020b610790f3d0039101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20ef2c4339212c389df87d612000000000040420f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004c691000e3bc06eef6805d7454797698cdf6b7e6',
                'transactionJSON': {},
                'requestProcessingTime': 4
            };
            expect(() => {
                verifyTransaction(requestType, formData, testResponse);
            }).toThrow(/^Verification failed/);
        });
    });

    describe('issueAsset', function () {
        it('should pass verification as expected - with zero quantity and mintable', () => {
            const requestType = 'issueAsset';
            const formData = {
                name: 'asadasd',
                description: 'asdasd',
                quantityQNT: '0',
                decimals: '4',
                mintable: 'true',
                feeNQT: '15000000000',
                publicKey: '6e1a0abea0cbacdc8c77a7de2868360d3e667b276a2f32bb847579d126d63e78',
                deadline: 1440
            };

            const testResponse = {
                'broadcasted': false,
                'unsignedTransactionBytes': '022053672410a0056e1a0abea0cbacdc8c77a7de2868360d3e667b276a2f32bb847579d126d63e780000000000000000000000000000000000d6117e03000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008dfc07009b91f30fa55b0cf204cfe1531b543c7c020761736164617364060061736461736400000000000000000401',
                'transactionJSON': {},
                'requestProcessingTime': 8
            };
            expect(() => {
                verifyTransaction(requestType, formData, testResponse);
            }).not.toThrow();
        });
        it('should pass verification as expected - with non-zero quantity and non-mintable', () => {
            const requestType = 'issueAsset';
            const formData = {
                name: 'TESTZEE',
                description: 'foo',
                quantityQNT: '10000000',
                decimals: '1',
                mintable: 'false',
                feeNQT: '15000000000',
                publicKey: 'c213e4144ba84af94aae2458308fae1f0cb083870c8f3012eea58147f3b09d4a',
                deadline: 60
            };

            const testResponse = {
                'broadcasted': false,
                'unsignedTransactionBytes': '02206252270f3c00c213e4144ba84af94aae2458308fae1f0cb083870c8f3012eea58147f3b09d4a0000000000000000000000000000000000d6117e0300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c8ef06001b1677b46e5d2a5a04cfe1531b543c7c0107544553545a45450300666f6f809698000000000001',
                'transactionJSON': {},
                'requestProcessingTime': 8
            };
            expect(() => {
                verifyTransaction(requestType, formData, testResponse);
            }).not.toThrow();
        });
    });
    describe('sendMessage', function () {
        it('should pass verification as expected - for encrypted messages', () => {
            const requestType = 'sendMessage';
            const formData = {
                feeNQT: '1000000',
                recipient: '16107620026796983538',
                recipientPublicKey: '497d559d18d989b8e2d729eb6f69b70c1ddc3e554f75bef3ed2716a4b2121902',
                publicKey: 'c213e4144ba84af94aae2458308fae1f0cb083870c8f3012eea58147f3b09d4a',
                encryptedMessageData: 'b7d249d7d46b1c516abd34c7cb1351e65a965c77b8bde9673145e25aefad6f86fb9ac7c42ca60409088e0cf9839a0352670828c7697bbbd19357cac406afb579',
                encryptedMessageNonce: '909b32e23dc64dcfd1040fa3a533e6a269d5089bac27ac1048b9121cc9f36f47',
                messageToEncryptIsText: true,
                deadline: 1440
            };

            const testResponse = {
                'broadcasted': false,
                'unsignedTransactionBytes': '01203c852410a005c213e4144ba84af94aae2458308fae1f0cb083870c8f3012eea58147f3b09d4af2c4339212c389df000000000000000040420f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000acfc07004410d378004ac0b004cfe1531b543c7c0140000080b7d249d7d46b1c516abd34c7cb1351e65a965c77b8bde9673145e25aefad6f86fb9ac7c42ca60409088e0cf9839a0352670828c7697bbbd19357cac406afb579909b32e23dc64dcfd1040fa3a533e6a269d5089bac27ac1048b9121cc9f36f47',
                'transactionJSON': {},
                'requestProcessingTime': 8
            };
            expect(() => {
                verifyTransaction(requestType, formData, testResponse);
            }).not.toThrow();
        });
        it('should pass verification as expected - with non-zero quantity and non-mintable', () => {
            const requestType = 'issueAsset';
            const formData = {
                name: 'TESTZEE',
                description: 'foo',
                quantityQNT: '10000000',
                decimals: '1',
                mintable: 'false',
                feeNQT: '15000000000',
                publicKey: 'c213e4144ba84af94aae2458308fae1f0cb083870c8f3012eea58147f3b09d4a',
                deadline: 60
            };

            const testResponse = {
                'broadcasted': false,
                'unsignedTransactionBytes': '02206252270f3c00c213e4144ba84af94aae2458308fae1f0cb083870c8f3012eea58147f3b09d4a0000000000000000000000000000000000d6117e0300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c8ef06001b1677b46e5d2a5a04cfe1531b543c7c0107544553545a45450300666f6f809698000000000001',
                'transactionJSON': {},
                'requestProcessingTime': 8
            };
            expect(() => {
                verifyTransaction(requestType, formData, testResponse);
            }).not.toThrow();
        });
    });
    describe('setAlias Version 2 (TLD)', function () {
        it('should pass verification as expected - for default (non-given) tld', () => {
            const requestType = 'setAlias';
            const formData = {
                aliasName: '87dfadsj9as8fadjh',
                aliasURI: 'Hello world!',
                feeNQT: '20000000',
                publicKey: '6e1a0abea0cbacdc8c77a7de2868360d3e667b276a2f32bb847579d126d63e78',
                deadline: 1440
            };

            const testResponse = {
                'broadcasted': false,
                'unsignedTransactionBytes': '012100e42810a0056e1a0abea0cbacdc8c77a7de2868360d3e667b276a2f32bb847579d126d63e7800000000000000000000000000000000002d310100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004c010800f54aa052dcc9ace304cfe1531b543c7c0211383764666164736a396173386661646a680c0048656c6c6f20776f726c64210000000000000000',
                'transactionJSON': {},
                'requestProcessingTime': 8
            };
            expect(() => {
                verifyTransaction(requestType, formData, testResponse);
            }).not.toThrow();
        });
        it('should pass verification as expected - for other tld', () => {
            const requestType = 'setAlias';
            const formData = {
                aliasName: '123',
                aliasURI: 'test1',
                tld: 'crypto',
                feeNQT: '20000000',
                publicKey: '04d794aa453a5bbdb8d580f1d9a76b6d7a25cde0ed38c098550ea0f784d9317a',
                deadline: 20
            };

            const testResponse = {
                'broadcasted': false,
                'unsignedTransactionBytes': '01214dbc2510140004d794aa453a5bbdb8d580f1d9a76b6d7a25cde0ed38c098550ea0f784d9317a00000000000000000000000000000000002d31010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f8fd07001c0f3df7ded9719b04cfe1531b543c7c020331323305007465737431da2f073e06f78938',
                'transactionJSON': {},
                'requestProcessingTime': 8
            };
            expect(() => {
                verifyTransaction(requestType, formData, testResponse);
            }).not.toThrow();
        });
    });
});

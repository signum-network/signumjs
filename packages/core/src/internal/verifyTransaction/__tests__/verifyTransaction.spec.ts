import {verifyTransaction} from '../index';

describe('verifyTransaction', function () {
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
            'transactionJSON': { },
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
            'transactionJSON': { },
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
            'transactionJSON': { },
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
            'transactionJSON': { },
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
            'transactionJSON': { },
            'requestProcessingTime': 4
        };
        expect(() => {
            verifyTransaction(requestType, formData, testResponse);
        }).toThrow(/^Verification failed/);
    });
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
            'transactionJSON': { },
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
            'transactionJSON': { },
            'requestProcessingTime': 4
        };
        expect(() => {
            verifyTransaction(requestType, formData, testResponse);
        }).toThrow(/^Verification failed/);
    });
});

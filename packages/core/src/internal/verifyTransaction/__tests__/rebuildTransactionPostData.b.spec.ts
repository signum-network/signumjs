import {rebuildTransactionPostData} from '../rebuildTransactionPostData';

describe('rebuildTransactionPostData', () => {
    describe('addCommitment', () => {
        const requestType = 'addCommitment'
        it('should rebuild data correctly - simple', () => {
            const transactionBytes = '14212675870f370039101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e0000000000000000000000000000000040420f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000275607007a2cf43bdd8bafb904cfe1531b543c7c01eae1f50500000000'
            const rebuiltData = {
                amountNQT: '100000234',
                feeNQT: '1000000',
                publicKey: '39101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e',
                deadline: 55
            }
            const output = rebuildTransactionPostData(transactionBytes)
            expect(output.requestType).toEqual(requestType)
            expect(output.rebuiltData).toEqual(rebuiltData)
        })
    })
    describe('removeCommitment', () => {
        const requestType = 'removeCommitment'
        it('should rebuild data correctly - simple', () => {
            const transactionBytes = '14223677870f4d0039101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e0000000000000000000000000000000040420f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a57810001e99c86a8439c1d154797698cdf6b7e601041b23dd02000000'
            const rebuiltData = {
                amountNQT: '12300000004',
                feeNQT: '1000000',
                publicKey: '39101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e',
                deadline: 77
            }
            const output = rebuildTransactionPostData(transactionBytes)
            expect(output.requestType).toEqual(requestType)
            expect(output.rebuiltData).toEqual(rebuiltData)
        })
    })
    describe('sendMoneySubscription', () => {
        const requestType = 'sendMoneySubscription'
        it('should rebuild data correctly - simple', () => {
            const transactionBytes = '1523267a870f580039101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e1600000000000000041b23dd0200000040420f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002c56070060ad2b2d3487ca4b04cfe1531b543c7c019f5b0000'
            const rebuiltData = {
                recipient: '22',
                amountNQT: '12300000004',
                frequency: '23455',
                feeNQT: '1000000',
                publicKey: '39101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e',
                deadline: 88
            }
            const output = rebuildTransactionPostData(transactionBytes)
            expect(output.requestType).toEqual(requestType)
            expect(output.rebuiltData).toEqual(rebuiltData)
        })
    })
    describe('subscriptionCancel', () => {
        const requestType = 'subscriptionCancel'
        it('should rebuild data correctly - simple', () => {
            const transactionBytes = '1524777b870f160004ba5473c92877aaa46f155c6481eacf40ddaac7f0a0d757f855f5e8646c53480000000000000000000000000000000040420f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002e560700ea4805129cda8b6c04cfe1531b543c7c01ead0480b9353131d'
            const rebuiltData = {
                subscription: '2095110142672031978',
                feeNQT: '1000000',
                publicKey: '04ba5473c92877aaa46f155c6481eacf40ddaac7f0a0d757f855f5e8646c5348',
                deadline: 22
            }
            const output = rebuildTransactionPostData(transactionBytes)
            expect(output.requestType).toEqual(requestType)
            expect(output.rebuiltData).toEqual(rebuiltData)
        })
    })
})

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
    describe('createATProgram', () => {
        const requestType = 'createATProgram'
        it('should rebuild data correctly - using creationBytes', () => {
            const transactionBytes = '16203f528b0f180039101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e00000000000000000000000000000000005a62020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000435a0700fdd862bf09efe61704cfe1531b543c7c01044242424213004141414141414141414141414141414141414103000000010001000100010080f0fa02000000003a010300000005000000000000000103000000060000000000000001000000000100000000000000250000000001030000000700000000000000283800000000000000000000000000000000010000000000000000e1f5050000000000000000000000002feb1303309a8aa50800000000000000'
            const rebuiltData = {
                name: 'BBBB',
                description: 'AAAAAAAAAAAAAAAAAAA',
                creationBytes: '03000000010001000100010080f0fa02000000003a010300000005000000000000000103000000060000000000000001000000000100000000000000250000000001030000000700000000000000283800000000000000000000000000000000010000000000000000e1f5050000000000000000000000002feb1303309a8aa50800000000000000',
                code: '01030000000500000000000000010300000006000000000000000100000000010000000000000025000000000103000000070000000000000028',
                data: '00000000000000000000000000000000010000000000000000e1f5050000000000000000000000002feb1303309a8aa50800000000000000',
                dpages: '1',
                cspages: '1',
                uspages: '1',
                minActivationAmountNQT: '50000000',
                feeNQT: '40000000',
                publicKey: '39101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e',
                deadline: 24
            }
            const output = rebuildTransactionPostData(transactionBytes)
            expect(output.requestType).toEqual(requestType)
            expect(output.rebuiltData).toEqual(rebuiltData)
        })
        it('should rebuild data correctly - using  referencedTransactionFullHash', () => {
            const transactionBytes = '162059828b0f180039101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e00000000000000000000000000000000804a5d0500000000733964d9ece13f91ff4d16d0f3d8780b51a1cea6154c8d0fcaf64357960508c20000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000765a0700a00d2898ae311ce904cfe1531b543c7c01044242424213004141414141414141414141414141414141414102000000000007000100010000c2eb0b00000000000000'
            const rebuiltData = {
                name: 'BBBB',
                description: 'AAAAAAAAAAAAAAAAAAA',
                feeNQT: '90000000',
                referencedTransactionFullHash: '733964d9ece13f91ff4d16d0f3d8780b51a1cea6154c8d0fcaf64357960508c2',
                publicKey: '39101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e',
                deadline: 24
            }
            const output = rebuildTransactionPostData(transactionBytes)
            expect(output.requestType).toEqual(requestType)
            expect(output.rebuiltData).toEqual(rebuiltData)
        })
        it('should rebuild data correctly - using  referencedTransactionFullHash and data', () => {
            const transactionBytes = '1620d0858b0f180039101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e00000000000000000000000000000000804a5d0500000000733964d9ece13f91ff4d16d0f3d8780b51a1cea6154c8d0fcaf64357960508c200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007a5a070060a6f1ff938e38a204cfe1531b543c7c01044242424213004141414141414141414141414141414141414102000000000007000100010000c2eb0b0000000000600000000000000000000000000000000000010000000000000000e1f5050000000000000000000000002feb1303309a8aa508000000000000000a000000000000000000000000000000000000000000000000000000000000000c00000000000000'
            const rebuiltData = {
                name: 'BBBB',
                description: 'AAAAAAAAAAAAAAAAAAA',
                data: '00000000000000000000000000000000010000000000000000e1f5050000000000000000000000002feb1303309a8aa508000000000000000a000000000000000000000000000000000000000000000000000000000000000c00000000000000',
                feeNQT: '90000000',
                referencedTransactionFullHash: '733964d9ece13f91ff4d16d0f3d8780b51a1cea6154c8d0fcaf64357960508c2',
                publicKey: '39101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e',
                deadline: 24
            }
            const output = rebuildTransactionPostData(transactionBytes)
            expect(output.requestType).toEqual(requestType)
            expect(output.rebuiltData).toEqual(rebuiltData)
        })
    })
})

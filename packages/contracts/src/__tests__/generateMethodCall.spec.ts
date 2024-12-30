import {generateMethodCall} from '../generateMethodCall';

const ContractMethodId = '-327803124352370';

describe('generateMethodCall', () => {
    it('generates a method call without argument', () => {
        const message = generateMethodCall({
            methodId: ContractMethodId
        });
        expect(message).toBe('8e7a3763ddd5feff');
    });

    it('generates a method call with three arguments', () => {
        const message = generateMethodCall({
            methodId: ContractMethodId,
            methodArgs: [true, 1234, '-1234567890'],
        });
        expect(message).toBe('8e7a3763ddd5feff0100000000000000d2040000000000002efd69b6ffffffff');
    });
});

import {ChainValue, ChainValueFormats} from '../chainValue';

describe('ChainValue', () => {
    describe('setAtomic and getAtomic', () => {
        it('Should return value correctly', () => {
            const value = new ChainValue(4);
            expect(value.setAtomic('1').getAtomic()).toEqual('1');
            expect(value.setAtomic('0').getAtomic()).toEqual('0');
            expect(value.setAtomic(0).getAtomic()).toEqual('0');
            expect(value.setCompound('1').getAtomic()).toEqual('10000');
        });
        it('Should return no fractional atomic value ', () => {
            const value = new ChainValue(2);
            expect(value.setAtomic('1.01').getAtomic()).toEqual('1');
            expect(value.setCompound('1.00000000003340501').getAtomic()).toEqual('100');
            expect(value.setCompound('100.00000000003340501').getAtomic()).toEqual('10000');
        });
        it('Should throw error for invalid value', () => {
            expect(() => {
                new ChainValue(2).setAtomic('');
            }).toThrow();
        });
        it('Should accept 0 decimals', () => {
            expect(new ChainValue(0).setAtomic('100').getCompound()).toEqual('100');
        });
    });
    describe('setCompound and getCompound', () => {
        it('Should return value correctly', () => {
            const value = new ChainValue(8);
            expect(value.setCompound('1').getCompound()).toEqual('1');
            expect(value.setCompound('0').getCompound()).toEqual('0');
            expect(value.setCompound(0).getCompound()).toEqual('0');
            expect(value.setCompound(null).getCompound()).toEqual('0');
            expect(value.setCompound('1.23').getCompound()).toEqual('1.23');
        });
        it('Should not consider fractional planck', () => {
            const value = new ChainValue(2);
            expect(value.setCompound('1.023').getCompound()).toEqual('1.02');
            expect(value.setCompound('1.00030030023').getCompound()).toEqual('1');
        });
        it('Should throw error for invalid value', () => {
            expect(() => {
                new ChainValue(2).setCompound('test');
            }).toThrow();
            expect(() => {
                new ChainValue(2).setCompound('12bf');
            }).toThrow();
        });
    });
    describe('getRaw', () => {
        it('Should return value correctly', () => {
            const value = new ChainValue(8);
            expect(value.setAtomic('1').getRaw().eq(1)).toBeTruthy();
            expect(value.setCompound('1').getRaw().eq(1E8)).toBeTruthy();
        });
        it('Returned value should be immutable', () => {
            const value = new ChainValue(8).setCompound(1);
            expect(value.getCompound()).toEqual('1');
            const raw = value.getRaw();
            raw.plus(10000000);
            expect(value.getCompound()).toEqual('1');
        });
    });
    describe('toFormat', () => {
        it('Return String as Dot Decimal', () => {
            const value = new ChainValue(8);
            const Prefix = 'Ꞩ ';
            expect(value.setCompound(1000.12).toFormat(Prefix)).toEqual('Ꞩ 1,000.12');
            expect(value.setCompound('10').toFormat(Prefix)).toEqual('Ꞩ 10');
            expect(value.setCompound(1_000_000.23).toFormat(Prefix, ChainValueFormats.DotDecimal)).toEqual('Ꞩ 1,000,000.23');
        });
        it('Return String as Comma Decimal', () => {
            const value = new ChainValue(8);
            const Prefix = 'Ꞩ ';
            expect(value.setCompound('10').toFormat(Prefix, ChainValueFormats.CommaDecimal)).toEqual('Ꞩ 10');
            expect(value.setCompound(1_000_000.23).toFormat(Prefix, ChainValueFormats.CommaDecimal)).toEqual('Ꞩ 1.000.000,23');
        });
    });
    describe('equals', () => {
        it('should return true for value equality', () => {
            const amount1 = new ChainValue(4).setCompound('10');
            const amount2 = new ChainValue(4).setCompound('10');
            expect(amount1.equals(amount2)).toBeTruthy();
        });
        it('should return false for value inequality', () => {
            const amount1 = new ChainValue(4).setCompound('10');
            const amount2 = new ChainValue(4).setCompound('1');
            expect(amount1.equals(amount2)).toBeFalsy();
        });
    });
    describe('less', () => {
        it('should return true for lesser value', () => {
            const amount1 = new ChainValue(4).setCompound('1');
            const amount2 = new ChainValue(4).setCompound('10');
            expect(amount1.less(amount2)).toBeTruthy();
        });
        it('should return false for non-lesser value', () => {
            const amount1 = new ChainValue(4).setCompound('10');
            const amount2 = new ChainValue(4).setCompound('1');
            expect(amount1.less(amount2)).toBeFalsy();
            expect(amount1.less(amount1)).toBeFalsy();
        });
    });
    describe('lessOrEqual', () => {
        it('should return true for lesser-or-equal value', () => {
            const amount1 = new ChainValue(4).setCompound('1');
            const amount2 = new ChainValue(4).setCompound('10');
            expect(amount1.lessOrEqual(amount2)).toBeTruthy();
            expect(amount1.lessOrEqual(amount1)).toBeTruthy();
        });
        it('should return false for non-lesser-or-equal value', () => {
            const amount1 = new ChainValue(4).setCompound('10');
            const amount2 = new ChainValue(4).setCompound('1');
            expect(amount1.lessOrEqual(amount2)).toBeFalsy();
        });
    });
    describe('greater', () => {
        it('should return true for greater value', () => {
            const amount1 = new ChainValue(4).setCompound('10');
            const amount2 = new ChainValue(4).setCompound('1');
            expect(amount1.greater(amount2)).toBeTruthy();
        });
        it('should return false for non-greater value', () => {
            const amount1 = new ChainValue(4).setCompound('1');
            const amount2 = new ChainValue(4).setCompound('10');
            expect(amount1.greater(amount2)).toBeFalsy();
            expect(amount1.greater(amount1)).toBeFalsy();
        });
    });
    describe('greaterOrEqual', () => {
        it('should return true for greater-or-equal value', () => {
            const amount1 = new ChainValue(4).setCompound('10');
            const amount2 = new ChainValue(4).setCompound('1');
            expect(amount1.greaterOrEqual(amount2)).toBeTruthy();
            expect(amount1.greaterOrEqual(amount1)).toBeTruthy();
        });
        it('should return false for non-greater-or-equal value', () => {
            const amount1 = new ChainValue(4).setCompound('1');
            const amount2 = new ChainValue(4).setCompound('10');
            expect(amount1.greaterOrEqual(amount2)).toBeFalsy();
        });
    });
    describe('add', () => {
        it('should return correct sum single', () => {
            const amount1 = new ChainValue(4).setCompound('1');
            const amount2 = new ChainValue(4).setCompound('10');
            expect(amount1.add(amount2).getCompound()).toBe('11');
        });
        it('should return correct sum multiple', () => {
            const amount1 = new ChainValue(4).setCompound('10');
            const amount2 = new ChainValue(4).setCompound('1.25');
            expect(amount1.add(amount1).add(amount2).getCompound()).toBe('21.25');
        });
    });
    describe('subtract', () => {
        it('should return correct difference - single', () => {
            const amount1 = new ChainValue(4).setCompound('10');
            const amount2 = new ChainValue(4).setCompound('1');
            expect(amount1.subtract(amount2).getCompound()).toBe('9');
        });
        it('should return correct difference - multiple', () => {
            const amount1 = new ChainValue(4).setCompound('10');
            const amount2 = new ChainValue(4).setCompound('1');
            expect(amount1.subtract(amount2).subtract(amount2).getCompound()).toBe('8');
        });
        it('should return correct difference - negative', () => {
            const amount1 = new ChainValue(4).setCompound('1');
            const amount2 = new ChainValue(4).setCompound('10');
            expect(amount1.subtract(amount2).getCompound()).toBe('-9');
        });
    });
    describe('multiply', () => {
        it('should return correct product - single', () => {
            const amount1 = new ChainValue(4).setCompound('10');
            expect(amount1.multiply(2).getCompound()).toBe('20');
        });
        it('should return correct product - fraction', () => {
            const amount1 = new ChainValue(4).setCompound('10');
            expect(amount1.multiply(0.5).getCompound()).toBe('5');
        });
        it('should return correct product - multiple', () => {
            const amount1 = new ChainValue(4).setCompound('10');
            expect(amount1.multiply(2).multiply(10).getCompound()).toBe('200');
        });
        it('should return correct product - identity', () => {
            const amount1 = new ChainValue(4).setCompound('10');
            expect(amount1.multiply('1').getCompound()).toBe('10');
        });
        it('should return correct product - zero', () => {
            const amount1 = new ChainValue(4).setCompound('10');
            expect(amount1.multiply(0).getCompound()).toBe('0');
        });
        it('should throw error on invalid string value', () => {
            const amount1 = new ChainValue(4).setCompound('10');
            expect(() => amount1.multiply('invalid').getCompound()).toThrow();
        });
    });
    describe('divide', () => {
        it('should return correct quotient - single', () => {
            const amount1 = new ChainValue(4).setCompound('10');
            expect(amount1.divide(2).getCompound()).toBe('5');
        });
        it('should return correct quotient - fraction', () => {
            const amount1 = new ChainValue(4).setCompound('10');
            expect(amount1.divide(0.5).getCompound()).toBe('20');
        });
        it('should return correct quotient - identity', () => {
            const amount1 = new ChainValue(4).setCompound('10');
            expect(amount1.divide(1).getCompound()).toBe('10');
        });
        it('should throw error div-by-zero', () => {
            const amount1 = new ChainValue(4).setCompound('10');
            expect(() => {
                amount1.divide(0).getCompound();
            }).toThrow();
        });
    });
    describe('clone', () => {
        it('should return cloned instance value', () => {
            const amount = new ChainValue(4).setCompound('10');
            const cloned = amount.clone();
            amount.add(new ChainValue(4).setCompound('10'));
            expect(cloned.getCompound()).toBe('10');
        });
    });
});

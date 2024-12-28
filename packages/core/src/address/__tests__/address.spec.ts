import {describe, it, expect} from 'vitest';
import {Address} from '../address';
import {AddressPrefix} from '../../constants';

const TestAddress = {
    rs: 'FOOBAR-K37B-9V85-FB95-793HN',
    ex: '2UCGWTUEEY66TN7RNC189PM19C4ATCEUGQV929IY1N24H0Y82Z',
    id: '6502115112683865257',
    pk: '7210b8941929030324540238450e985899989a7ad0267e0c76f668fde3b1016b'
};

describe('Address', () => {
    describe('fromReedSolomonAddress', () => {
        it('should construct as expected with simple address', () => {
            const address = Address.fromReedSolomonAddress(TestAddress.rs);
            expect(address.getPublicKey()).toHaveLength(0);
            expect(address.getReedSolomonAddress()).toBe(TestAddress.rs);
            expect(address.getNumericId()).toBe(TestAddress.id);
        });
        it('should construct as expected with simple address - ignoring prefix', () => {
            const address = Address.fromReedSolomonAddress(TestAddress.rs.replace('BURST', 'FOOBAR'));
            expect(address.getPublicKey()).toHaveLength(0);
        });
        it('should construct as expected with extended address', () => {
            const address = Address.fromReedSolomonAddress(`${TestAddress.rs}-${TestAddress.ex}`);
            expect(address.getPublicKey()).toBe(TestAddress.pk);
        });
        it('should throw error on invalid address ', () => {
            expect(() => {
                Address.fromReedSolomonAddress('invalid');
            }).toThrow('Invalid Reed-Solomon Address Format: invalid');
        });
        it('should throw error on invalid address - not matching key', () => {
            expect(() => {
                Address.fromReedSolomonAddress(`${TestAddress.rs}-2UCGWTUEEY66TN7RNC189PM19C4ATCEUGQV929IY1N24H0Y810`);
            }).toThrow('Address and Public Key do not match');
        });
    });

    describe('fromNumericId', () => {
        it('should construct as expected', () => {
            const address = Address.fromNumericId(TestAddress.id, 'FOOBAR');
            expect(address.getReedSolomonAddress()).toBe(TestAddress.rs);
            expect(address.getPublicKey()).toHaveLength(0);
            expect(address.getNumericId()).toBe(TestAddress.id);
        });
        it('should throw error on invalid key', () => {
            expect(() => {
                Address.fromNumericId('wrong-format');
            }).toThrow(`Invalid numeric id: wrong-format`);
            expect(() => {
                Address.fromNumericId('');
            }).toThrow(`Invalid arguments`);
        });
    });

    describe('fromPublicKey', () => {
        it('should construct as expected', () => {
            const address = Address.fromPublicKey(TestAddress.pk);
            expect(address.getNumericId()).toBe(TestAddress.id);
        });
        it('should throw error on invalid key', () => {
            expect(() => {
                Address.fromPublicKey('invalid');
            }).toThrow('Invalid Public Key Format');
        });
    });

    describe('getReedSolomonAddress', () => {
        it('should return RS address', () => {
            const address = Address.fromPublicKey(TestAddress.pk, 'FOOBAR');
            expect(address.getReedSolomonAddress()).toBe(TestAddress.rs);
        });
        it('should return RS address without prefix', () => {
            const address = Address.fromPublicKey(TestAddress.pk, 'FOOBAR');
            expect(address.getReedSolomonAddress(false)).toBe(TestAddress.rs.replace('FOOBAR-', ''));
        });
    });

    describe('getReedSolomonAddressExtended', () => {
        it('should return extended RS address with custom prefix', () => {
            const address = Address.fromPublicKey(TestAddress.pk, 'FOOBAR');
            expect(address.getReedSolomonAddressExtended()).toBe(TestAddress.rs + '-' + TestAddress.ex);
        });
        it('should return extended RS address without prefix', () => {
            const address = Address.fromPublicKey(TestAddress.pk, 'FOOBAR');
            expect(address.getReedSolomonAddressExtended(false)).toBe(TestAddress.rs.replace('FOOBAR-', '') + '-' + TestAddress.ex);
        });
        it('should return extended RS address with default', () => {
            const address = Address.fromPublicKey(TestAddress.pk);
            expect(address.getReedSolomonAddressExtended()).toBe(TestAddress.rs.replace('FOOBAR', AddressPrefix.MainNet) + '-' + TestAddress.ex);
        });
    });

    describe('getAccountId', () => {
        it('should return account Id', () => {
            const address = Address.fromPublicKey(TestAddress.pk);
            expect(address.getNumericId()).toBe(TestAddress.id);
        });
    });

    describe('equals', () => {
        it('should be equal', () => {
            const address1 = Address.fromPublicKey(TestAddress.pk);
            const address2 = Address.fromReedSolomonAddress(TestAddress.rs + '-' + TestAddress.ex);
            expect(address1.equals(address2)).toBeTruthy();
        });
        it('should not be equal', () => {
            const address1 = Address.fromPublicKey(TestAddress.pk);
            const address2 = Address.fromPublicKey('7210B8941929030324540238450E985899989A7AD0267E0C76F668FDE3B10F00');
            expect(address1.equals(address2)).toBeFalsy();
        });
    });


    describe('create', () => {
        it('should create from public key address', () => {
            const address = Address.create(TestAddress.pk, 'FOOBAR');
            expect(address.getReedSolomonAddress()).toEqual(TestAddress.rs);
            expect(address.getReedSolomonAddressExtended()).toEqual(TestAddress.rs + '-' + TestAddress.ex);
            expect(address.getNumericId()).toEqual(TestAddress.id);
            expect(address.getPublicKey()).toEqual(TestAddress.pk);
        });

        it('should create from RS address - no pub key', () => {
            const address = Address.create(TestAddress.rs);
            expect(address.getReedSolomonAddress()).toEqual(TestAddress.rs);
            expect(address.getNumericId()).toEqual(TestAddress.id);
            expect(address.getPublicKey()).toHaveLength(0);
            expect(() => address.getReedSolomonAddressExtended()).toThrow('No public key available');
        });

        it('should create from numeric Id - no pub key', () => {
            const address = Address.create(TestAddress.id, 'FOOBAR');
            expect(address.getReedSolomonAddress()).toEqual(TestAddress.rs);
            expect(address.getNumericId()).toEqual(TestAddress.id);
            expect(address.getPublicKey()).toHaveLength(0);
            expect(() => address.getReedSolomonAddressExtended()).toThrow('No public key available');
        });

        it('should create from extended RS address - with pub key', () => {
            const address = Address.create(TestAddress.rs + '-' + TestAddress.ex);
            expect(address.getReedSolomonAddress()).toEqual(TestAddress.rs);
            expect(address.getNumericId()).toEqual(TestAddress.id);
            expect(address.getPublicKey()).toEqual(TestAddress.pk);
        });

        it('should throw error on invalid address', () => {
            expect(() => Address.create('invalid-address')).toThrow();
            expect(() => Address.create(null)).toThrow();
            expect(() => Address.create('')).toThrow();
        });
    });

});

/**
 * Original work Copyright (c) 2021 Burst Apps Team
 * Modified work Copyright (c) 2021 Signum Network
 */
import {getAccountIdFromPublicKey} from '@signumjs/crypto';
import {
    convertBase36StringToHexString,
    convertHexStringToBase36String,
} from '@signumjs/util';
import {ensureReedSolomonAddress} from './ensureReedSolomonAddress';
import {tokenizeReedSolomonAddress} from './tokenizeReedSolomonAddress';
import {convertReedSolomonAddressToNumericId} from './convertReedSolomonAddressToNumericId';
import {convertNumericIdToReedSolomonAddress} from './convertNumericIdToReedSolomonAddress';
import {AddressPrefix} from '../constants';

function ensureValidPublicKey(publicKey: string): void {
    if (!(publicKey && /^[a-fA-F0-9]{64}/.test(publicKey))) {
        throw new Error('Invalid Public Key Format');
    }
}

/**
 * A Value Object to facilitate Address conversions.
 *
 *
 */
export class Address {

    private _publicKey: string;
    private _numericId: string;
    private _rs: string;

    private constructor(args: { publicKey?: string, prefix?: string, address?: string }) {
        if (args.publicKey) {
            this.constructFromPublicKey(args.publicKey, args.prefix);
        } else if (args.address) {
            this.constructFromAddress(args.address);
        } else {
            throw new Error('Invalid arguments');
        }
    }

    /**
     * Tries to create the address from whatever input is given
     * @param anyValidAddress Any valid address, may it be Reed Solomon address, numeric ID, or public key
     * @param prefix An optional prefix, which can be used to substitute the default {@link AddressPrefix.MainNet}
     * @return The new address, if the input was valid
     * @throws when no valid format
     */
    public static create(anyValidAddress: string, prefix: string = AddressPrefix.MainNet): Address {
        try {
            tokenizeReedSolomonAddress(anyValidAddress);
            return Address.fromReedSolomonAddress(anyValidAddress);
        // @ts-ignore
        } catch (e:any) {
            try {
                ensureValidPublicKey(anyValidAddress);
                return Address.fromPublicKey(anyValidAddress, prefix);
            } catch (innerError) {
                return Address.fromNumericId(anyValidAddress, prefix);
            }
        }
    }

    public static fromNumericId(numericId: string, prefix: string = AddressPrefix.MainNet): Address {
        const address = convertNumericIdToReedSolomonAddress(numericId, prefix);
        return new Address({address});
    }

    /**
     * Creates an Account Address object from public key
     * @param publicKey The public key of that address (in hex format)
     * @param prefix The Reed-Solomon Address prefix
     */
    public static fromPublicKey(publicKey: string, prefix: string = AddressPrefix.MainNet): Address {
        return new Address({publicKey, prefix});
    }

    /**
     * Creates an Account Address object from extended Reed-Solomon address
     * @param address The Reed-Solomon address in simple or extended format (with base36 suffix)
     * @throws Error if the passed address is invalid
     */
    public static fromReedSolomonAddress(address: string): Address {

        ensureReedSolomonAddress(address);

        const {extension, prefix} = tokenizeReedSolomonAddress(address);

        if (extension) {
            const publicKey = convertBase36StringToHexString(extension).toLowerCase();

            if (convertReedSolomonAddressToNumericId(address) !== getAccountIdFromPublicKey(publicKey)) {
                throw Error('Address and Public Key do not match');
            }
            return new Address({publicKey, prefix});
        }

        return new Address({address});
    }

    /**
     * @return Gets public key
     */
    getPublicKey(): string {
        return this._publicKey.toLowerCase();
    }

    /**
     * @return Gets numeric Account Id
     */
    getNumericId(): string {
        return this._numericId;
    }

    /**
     * Gets as Reed Solomon representation
     * @param withPrefix If false, the address without prefix will be returned. Default: true
     * @return Reed Solomon Address Format
     * @see {@link Address.getReedSolomonAddressExtended}
     */
    getReedSolomonAddress(withPrefix = true): string {
        return withPrefix ? this._rs : this._rs.substr(this._rs.indexOf('-') + 1);
    }

    /**
     * Gets as extended Reed Solomon representation carrying the public key as suffix in base36 encoding
     *
     * This method requires that the address was created from a public key or extended address.
     *
     * @param withPrefix If false, the address without prefix will be returned. Default: true
     * @return Extended Reed Solomon Address Format
     * @throws if no public key is available
     * @see {@link Address.getReedSolomonAddress}
     */
    getReedSolomonAddressExtended(withPrefix = true): string {
        if (!this._publicKey) {
            throw new Error('No public key available');
        }
        return `${this.getReedSolomonAddress(withPrefix)}-${convertHexStringToBase36String(this._publicKey)}`.toUpperCase();
    }

    /**
     * Checks for equality
     * @param address The other address to be compared
     * @return true if equal, otherwise false
     */
    public equals(address: Address): boolean {
        return this._numericId === address._numericId;
    }

    private constructFromPublicKey(publicKey: string, prefix: string): void {
        ensureValidPublicKey(publicKey);
        this._publicKey = publicKey.toLowerCase();
        this._numericId = getAccountIdFromPublicKey(publicKey);
        this._rs = convertNumericIdToReedSolomonAddress(this._numericId, prefix);
    }

    private constructFromAddress(address: string): void {
        this._publicKey = '';
        this._rs = address;
        this._numericId = convertReedSolomonAddressToNumericId(address);
    }

}

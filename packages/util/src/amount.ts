/**
 * Original work Copyright (c) 2020 Burst Apps Team
 * Modified work Copyright (c) 2022 Signum Network
 */
import BigNumber from 'bignumber.js';
import {CurrencySymbol} from './constants';
import {ChainValue} from './chainValue';

/**
 * Structure to determine the representation format of [Amount] string
 *
 * @category value-objects
 */
export interface AmountFormat {
    /**
     * string to prepend, Default: CurrencySymbol
     */
    prefix: string;
    /**
     * Decimal separator, Default: '.'
     */
    decimalSeparator: string;
    /**
     * grouping separator of the integer part, Default: ','
     */
    groupSeparator: string;
    /**
     * Primary grouping size of the integer part, Default: 3
     */
    groupSize: number;
    /**
     * Secondary grouping size of the integer part, Default 0
     */
    secondaryGroupSize: number;
    /**
     * Grouping separator of the fraction part, Default: ''
     */
    fractionGroupSeparator: string;
    /**
     * Grouping size of the fraction part, Default: 0
     */
    fractionGroupSize: number;
    /**
     * String to append, Default: ''
     */
    suffix: string;
}


/**
 * Amount formatting preset for dot decimal formatting 'Ꞩ 1,000,000.123456'
 *
 * @category value-objects
 */
export const FormatDotDecimal: AmountFormat = {
    prefix: CurrencySymbol + ' ',
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: '',
    fractionGroupSize: 0,
    suffix: ''
};

/**
 * Amount formatting preset for comma decimal formatting 'Ꞩ 1.000.000,123456'
 *
 * @category value-objects
 */
export const FormatCommaDecimal: AmountFormat = {
    prefix: CurrencySymbol + ' ',
    decimalSeparator: ',',
    groupSeparator: '.',
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: '',
    fractionGroupSize: 0,
    suffix: ''
};

/**
 * Amount formatting presets, see {@link Amount.toString}
 *
 * @category value-objects
 */
export const AmountFormats = {
    /**
     * 1,000,000.123456
     */
    DotDecimal: FormatDotDecimal,
    /**
     * 1.000.000,123456
     */
    CommaDecimal: FormatCommaDecimal
};

/**
 * A Value Object to facilitate SIGNA and Planck conversions/calculations.
 *
 * This class is a convenient wrapper around {@link ChainValue} with `decimals = 8`
 *
 * Note: This class uses a big number representation (ES5 compatible) under the hood, so
 * number limits and numeric calculations are much more precise than JS number type
 *
 * @category value-objects
 */
export class Amount {
    private _value: ChainValue;

    private constructor(planck: number | string) {
        this._value = new ChainValue(8).setAtomic(planck);
    }

    /**
     * @return The Signa Currency Symbol
     * @deprecated Due to Multiverse feature it's not recommended to use this hard coded stuff.
     * 
     */
    public static CurrencySymbol(): string {
        return CurrencySymbol;
    }

    /**
     * Same as `Amount.fromPlanck(0)` or `Amount.fromSigna(0)`
     */
    public static Zero(): Amount {
        return new Amount(0);
    }

    /**
     * Creates a Burst Value object from Planck
     * @param planck The value in Planck
     */
    public static fromPlanck(planck: number | string): Amount {
        return new Amount(planck);
    }

    /**
     * Creates a Value object from SIGNA
     * @param signa The value in SIGNA
     */
    public static fromSigna(signa: number | string): Amount {
        const b = new Amount('0');
        b.setSigna(typeof signa === 'number' ? signa.toString(10) : signa);
        return b;
    }

    /**
     * Leaky value getter
     * @return the underlying value in its big number representation (immutable)
     */
    getRaw(): BigNumber {
        return this._value.getRaw();
    }

    /**
     * @return Gets Planck representation
     */
    getPlanck(): string {
        return this._value.getAtomic();
    }

    /**
     * Sets value as Planck, i.e. overwrites current hold value
     * @param p The planck value
     * @return This value object
     */
    setPlanck(p: string): Amount {
        this._value.setAtomic(p);
        return this;
    }

    /**
     * Gets SIGNA representation
     * @return value in SIGNA
     */
    getSigna(): string {
        return this._value.getCompound();
    }

    /**
     * Sets value as SIGNA, i.e. overwrites current hold value
     * @param b value in SIGNA
     * @return This value object
     */
    setSigna(b: string): Amount {
        this._value.setCompound(b);
        return this;
    }

    /**
     * Checks for equality
     * @param amount The other value to be compared
     * @return true if equal, otherwise false
     */
    public equals(amount: Amount): boolean {
        return this._value.equals(amount._value);
    }

    /**
     * Checks for lesser or equality
     * @param amount The other value to be compared
     * @return true if less or equal, otherwise false
     */
    public lessOrEqual(amount: Amount): boolean {
        return this._value.lessOrEqual(amount._value);
    }

    /**
     * Checks for lesser value
     * @param amount The other value to be compared
     * @return true if less, otherwise false
     */
    public less(amount: Amount): boolean {
        return this._value.less(amount._value);
    }

    /**
     * Checks for greater or equality value
     * @param amount The other value to be compared
     * @return true if greater or equal, otherwise false
     */
    public greaterOrEqual(amount: Amount): boolean {
        return this._value.greaterOrEqual(amount._value);
    }

    /**
     * Checks for greater value
     * @param amount The other value to be compared
     * @return true if greater, otherwise false
     */
    public greater(amount: Amount): boolean {
        return this._value.greater(amount._value);
    }

    /**
     * Adds two values
     * @param amount The other value to be added
     * @return the _mutated_ Amount object
     */
    public add(amount: Amount): Amount {
        this._value.add(amount._value);
        return this;
    }

    /**
     * Subtracts from value
     * @param amount The other value to be subtracted
     * @return the _mutated_ Amount object
     */
    public subtract(amount: Amount): Amount {
        this._value.subtract(amount._value);
        return this;
    }

    /**
     * Multiplies with a _numeric_ value (not Amount)
     * @param value A numeric value to be multiplied with
     * @return the _mutated_ Amount object
     */
    public multiply(value: number): Amount {
        this._value.multiply(value);
        return this;
    }

    /**
     * Divides by a _numeric_ value (not Amount)
     * @param value A numeric value to be divided by
     * @return the _mutated_ Amount object
     */
    public divide(value: number): Amount {
        this._value.divide(value);
        return this;
    }

    /**
     * Gets a string representation in form `Ꞩ 100`
     * @param format The format object, Default: {@link AmountFormats.DotDecimal}
     * @return The formatted string
     */
    public toString(format: AmountFormat = AmountFormats.DotDecimal): string {
        return this._value.toFormat(format.prefix, format);
    }

    /**
     * Clones/Copies the current Amount to a new object
     * @return new Amount instance
     */
    public clone(): Amount {
        return Amount.fromPlanck(this.getPlanck());
    }
}

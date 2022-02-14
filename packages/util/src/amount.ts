/**
 * Original work Copyright (c) 2020 Burst Apps Team
 * Modified work Copyright (c) 2022 Signum Network
 */
import BigNumber from 'bignumber.js';
import {CurrencySymbol} from './constants';

BigNumber.config({
    EXPONENTIAL_AT: [-9, 20],
    DECIMAL_PLACES: 8 // TODO: should be better configurable
});

/**
 * Structure to determine the representation format of [Amount] string
 * @module util
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
 * @module util
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
 * @module util
 */
const FormatCommaDecimal: AmountFormat = {
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
 * Amount formatting presets, see [[Amount.toString]]
 * @module util
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


function assureValidValue(v: string): void {
    if (!(v && /^-?\d*(\.\d+)?$/.test(v))) {
        throw new Error(`Invalid value: ${v}`);
    }
}

/**
 * A Value Object to facilitate SIGNA and Planck conversions/calculations.
 *
 * Note: This class uses a big number representation (ES5 compatible) under the hood, so
 * number limits and numeric calculations are much more precise than JS number type
 *
 * @module util
 */
export class Amount {

    private _planck: BigNumber;

    private constructor(planck: number | string) {
        if (typeof planck === 'string') {
            assureValidValue(planck);
        }
        this._planck = new BigNumber(planck);
    }

    public static CurrencySymbol(): string {
        return CurrencySymbol;
    }

    public static Zero(): Amount {
        return new Amount('0');
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
        return this._planck;
    }

    /**
     * @return Gets Planck representation
     */
    getPlanck(): string {
        return this._planck.toFixed(0);
    }

    /**
     * Sets value as Planck, i.e. overwrites current hold value
     * @param p The planck value
     */
    setPlanck(p: string): void {
        assureValidValue(p);
        this._planck = new BigNumber(p);
    }

    /**
     * Gets SIGNA representation
     * @return value in SIGNA
     */
    getSigna(): string {
        return this._planck.dividedBy(1E8).toString();
    }

    /**
     * Sets value as SIGNA, i.e. overwrites current hold value
     * @param b value in SIGNA
     */
    setSigna(b: string): void {
        assureValidValue(b);
        this._planck = new BigNumber(b).multipliedBy(1E8);
    }

    /**
     * Checks for equality
     * @param amount The other value to be compared
     * @return true if equal, otherwise false
     */
    public equals(amount: Amount): boolean {
        return this._planck.eq(amount._planck);
    }

    /**
     * Checks for lesser or equality
     * @param amount The other value to be compared
     * @return true if less or equal, otherwise false
     */
    public lessOrEqual(amount: Amount): boolean {
        return this._planck.lte(amount._planck);
    }

    /**
     * Checks for lesser value
     * @param amount The other value to be compared
     * @return true if less, otherwise false
     */
    public less(amount: Amount): boolean {
        return this._planck.lt(amount._planck);
    }

    /**
     * Checks for greater or equality value
     * @param amount The other value to be compared
     * @return true if greater or equal, otherwise false
     */
    public greaterOrEqual(amount: Amount): boolean {
        return this._planck.gte(amount._planck);
    }

    /**
     * Checks for greater value
     * @param amount The other value to be compared
     * @return true if greater, otherwise false
     */
    public greater(amount: Amount): boolean {
        return this._planck.gt(amount._planck);
    }

    /**
     * Adds two values
     * @param amount The other value to be added
     * @return the _mutated_ Amount object
     */
    public add(amount: Amount): Amount {
        this._planck = this._planck.plus(amount._planck);
        return this;
    }

    /**
     * Subtracts from value
     * @param amount The other value to be subtracted
     * @return the _mutated_ Amount object
     */
    public subtract(amount: Amount): Amount {
        this._planck = this._planck.minus(amount._planck);
        return this;
    }

    /**
     * Multiplies with a _numeric_ value (not Amount)
     * @param value A numeric value to be multiplied with
     * @return the _mutated_ Amount object
     */
    public multiply(value: number): Amount {
        this._planck = this._planck.multipliedBy(value);
        return this;
    }

    /**
     * Divides by a _numeric_ value (not Amount)
     * @param value A numeric value to be divided by
     * @return the _mutated_ Amount object
     */
    public divide(value: number): Amount {
        if (value === 0) {
            throw new Error('Division by zero');
        }
        this._planck = this._planck.div(value);
        return this;
    }

    /**
     * Gets a string representation in form `Ꞩ 100`
     * @param format The format object, Default: [[AmountFormats.DotDecimal]]
     * @return The formatted string
     */
    public toString(format: AmountFormat = AmountFormats.DotDecimal): string {
        return this._planck.dividedBy(1E8).toFormat(format);
    }

    /**
     * Clones/Copies the current Amount to a new object
     * @return new Amount instance
     */
    public clone(): Amount {
        return Amount.fromPlanck(this.getPlanck());
    }
}

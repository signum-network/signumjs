/**
 * Copyright (c) 2022 Signum Network
 */
import BigNumber from 'bignumber.js';

BigNumber.config({
    EXPONENTIAL_AT: [-9, 20],
    DECIMAL_PLACES: 8
});

/**
 * Structure to determine the representation format of [ChainValue] string
 * @module util
 */
export interface ChainValueFormat {
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
 * Amount formatting preset for dot decimal formatting '1,000,000.123456'
 * @module util
 */
const FormatDotDecimal: ChainValueFormat = {
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: '',
    fractionGroupSize: 0,
    suffix: ''
};

/**
 * Amount formatting preset for comma decimal formatting '1.000.000,123456'
 * @module util
 */
const FormatCommaDecimal: ChainValueFormat = {
    decimalSeparator: ',',
    groupSeparator: '.',
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: '',
    fractionGroupSize: 0,
    suffix: ''
};

/**
 * Amount formatting presets, see [[ChainValue.toFormat]]
 * @module util
 */
export const ChainValueFormats = {
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
 * A Value Object to facilitate calculations for token and coin values (QNT/NQT).
 *
 *
 * For efficiency reasons, the monetary values/quantities are stored as integers with a prefined set of decimals,
 * e.g. Signa has 8 decimals and stores the values as Planck that is 1 Signa = 100_000_000 Planck (NQT)
 * and tokens have configurable decimals (0 to 8), so that a custom FooCoin can hav 2 decimals only where 1 FOO = 100 FOOQNT
 *
 * In this context integer quantities are denominates as __atomic_ values and
 * fractional values considering the decimals are denominated as _compound_ values.
 *
 *
 * Note: This class uses a big number representation (ES5 compatible) under the hood, so
 * number limits and numeric calculations are much more precise than JS number type
 *
 * @module util
 */
export class ChainValue {

    private _big: BigNumber;
    private _decimals: number;

    /**
     * Constructs a value object instance for calculations. The initial value is 0;
     * @param decimals The number of decimals of the amount. Must be between 0 and 8
     */
    public constructor(decimals: number) {
        if (decimals < 0 || decimals > 8) {
            throw new Error('Decimals must be between 0 and 8');
        }
        this._big = new BigNumber(0);
        this._decimals = decimals;
    }

    /**
     * @return The set decimals amount
     */
    getDecimals(): number {
        return this._decimals;
    }

    /**
     * Leaky value getter
     * @return the underlying value in its big number representation (immutable)
     */
    getRaw(): BigNumber {
        return this._big;
    }

    /**
     * @return Gets Atomic representation
     */
    getAtomic(): string {
        return this._big.dp(0).toString();
    }

    /**
     * Sets value as atomic value, i.e. overwrites current hold value
     * @param a The atomic value. Float numbers are floored to first lower integer, i.e. `1.23` -> `1`
     * @return the updated value object
     */
    setAtomic(a: number | string): ChainValue {
        if (typeof (a) === 'number') {
            this._big = new BigNumber(Math.floor(a));
        } else {
            assureValidValue(a);
            this._big = new BigNumber(a);
        }
        return this;
    }

    /**
     * Gets the _'compound'_ representation
     * @return value in decimal related representation, i.e. 100 QNT with 3 decimals results in `'0.3'`
     */
    getCompound(): string {
        return this._big.dividedBy(10 ** this._decimals).dp(this._decimals).toString();
    }

    /**
     * Sets as _'compound'_ representation
     * @param c compound value
     * @return the updated value object
     */
    setCompound(c: string | number): ChainValue {
        if (typeof (c) === 'string') {
            assureValidValue(c);
        }
        this._big = new BigNumber(c || 0).multipliedBy(10 ** this._decimals);
        return this;
    }

    /**
     * Checks for equality
     * @param value The other value to be compared
     * @return true if equal, otherwise false
     */
    public equals(value: ChainValue): boolean {
        return this._big.eq(value._big);
    }

    /**
     * Checks for lesser or equality
     * @param chainValue The other value to be compared
     * @return true if less or equal, otherwise false
     */
    public lessOrEqual(chainValue: ChainValue): boolean {
        return this._big.lte(chainValue._big);
    }

    /**
     * Checks for lesser value
     * @param chainValue The other value to be compared
     * @return true if less, otherwise false
     */
    public less(chainValue: ChainValue): boolean {
        return this._big.lt(chainValue._big);
    }

    /**
     * Checks for greater or equality value
     * @param chainValue The other value to be compared
     * @return true if greater or equal, otherwise false
     */
    public greaterOrEqual(chainValue: ChainValue): boolean {
        return this._big.gte(chainValue._big);
    }

    /**
     * Checks for greater value
     * @param chainValue The other value to be compared
     * @return true if greater, otherwise false
     */
    public greater(chainValue: ChainValue): boolean {
        return this._big.gt(chainValue._big);
    }

    /**
     * Adds another value to this value
     * @param chainValue The other value to be added
     * @return the _mutated_ value object
     */
    public add(chainValue: ChainValue): ChainValue {
        this._big = this._big.plus(chainValue._big);
        return this;
    }

    /**
     * Subtracts another value from this value
     * @param chainValue The other value to be subtracted
     * @return the _mutated_ value object
     */
    public subtract(chainValue: ChainValue): ChainValue {
        this._big = this._big.minus(chainValue._big);
        return this;
    }

    /**
     * Multiplies this value object with a _numeric_ value (not ChainValue!)
     * @param value A numeric value to be multiplied with
     * @return the _mutated_ value object
     */
    public multiply(value: number | string): ChainValue {
        let v = value;
        if (typeof (value) === 'string') {
            assureValidValue(value);
            v = parseFloat(value);
        }
        this._big = this._big.multipliedBy(v);
        return this;
    }

    /**
     * Divides this value object with a _numeric_ value (not ChainValue!)
     * @param value A numeric value to be divided by
     * @return the _mutated_ value object
     */
    public divide(value: number | string): ChainValue {
        let v = value;
        if (typeof (value) === 'string') {
            assureValidValue(value);
            v = parseFloat(value);
        }
        if (v === 0) {
            throw new Error('Division by zero');
        }
        this._big = this._big.div(v);
        return this;
    }

    /**
     * Gets a string representation according to [[ChainValueFormat]]
     * @param prefix The prefix for value
     * @param format The format object, Default: [[ChainValueFormats.DotDecimal]]
     * @return The formatted string
     */
    public toFormat(prefix: string, format: ChainValueFormat = ChainValueFormats.DotDecimal): string {
        return this._big.dividedBy(10 ** this._decimals).toFormat({...format, prefix});
    }

    /**
     * Clones/Copies the current ChainValue to a new object
     * @return new ChainValue instance
     */
    public clone(): ChainValue {
        const newValue = new ChainValue(this._decimals);
        newValue._big = this._big;
        return newValue;
    }
}

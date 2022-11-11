/**
 * Copyright (c) 2022 Signum Network
 */

import {Profile, SRC44Profile, SRC44ProfileType} from './typings';
import {SRC44ParseException, SRC44ValidationException} from './exceptions';
import {sanitizeUrl} from '@braintree/sanitize-url';
import {validateSRC44} from './validateSRC44';
import { parseIpfsMedia } from './parseIpfsMedia';

/**
 * Profile Data
 *
 * SRC44-compliant Profile Data to be used as description in Smart Contracts, Account Info, and/or Aliases.
 * Use [[ProfileDataBuilder]] to construct from the scratch, or use this to parse json data
 * @module standards.SRC44
 */
export class ProfileData {

    private constructor(private data: SRC44Profile) {
        this.validate();
    }

    /**
     * Leaky abstraction to get access to the pure raw SRC44 profile data
     * @return the raw SRC44 object.
     */
    get raw() {
        return this.data;
    }

    get version() {
        return this.data.vs;
    }

    get name() {
        return this.data.nm;
    }

    get alias() {
        return this.data.al;
    }

    get id() {
        return this.data.id;
    }

    get account() {
        return this.data.ac;
    }

    get description() {
        return this.data.ds;
    }

    get type(): SRC44ProfileType {
        return this.data.tp;
    }

    get extension() {
        return this.data.xt;
    }

    get avatar() {
        return parseIpfsMedia(this.data.av);
    }

    get background() {
        return parseIpfsMedia(this.data.bg);
    }

    get sendRule() {
        return this.data.sr ? new RegExp(this.data.sr) : undefined;
    }

     get homePage() {
        return this.data.hp ? sanitizeUrl(this.data.hp) : undefined;
    }

    get socialMediaLinks() {
        return this.data.sc ? this.data.sc.map(sanitizeUrl) : undefined;
    }

    /**
     * Creates a bare minimum SRC44 profile instance.
     * @param name The name
     */
    public static create(name?: string) {
        return new ProfileData({
            vs: 1,
            nm: name
        });
    }

    /**
     * Creates/Parses a SRC44 compliant profile string
     * @param jsonString The SRC44 compliante string. See also [[stringify]]
     */
    public static parse(jsonString: string) {
        try {
            const profile = JSON.parse(jsonString);
            return new ProfileData(profile);
        // @ts-ignore
        } catch (e: any) {
            throw new SRC44ParseException(e.message);
        }
    }

    /**
     * Gets a custom field (inline extension)
     * @param fieldName
     */
    getCustomField(fieldName: string) {
        return this.data[fieldName];
    }

    /**
     * Gets a more human friendly version of the data
     */
    get(): Profile {
        const {vs, nm, ds, tp, av, bg, hp, sc, sr, xt, al, id, ac, ...custom} = this.data;
        return {
            version: this.version,
            name: this.name,
            description: this.description,
            type: this.type,
            avatar: this.avatar,
            background: this.background,
            homePage: this.homePage,
            socialMediaLinks: this.socialMediaLinks,
            sendRule: this.sendRule,
            extension: this.extension,
            alias: this.alias,
            account: this.account,
            id: this.id,
            ...custom
        };
    }

    /**
     * Validates the current profile data.
     * @throws in case of invalid data.
     */
    public validate() {
        validateSRC44(this.raw);
    }

    /**
     * @return The SRC44 string to be set with Signum Accounts, Contracts and/or Aliases
     * @throws if the string exceeds 1000 bytes.
     */
    public stringify(): string {
        const MaxLength = 1000;
        const str = JSON.stringify(this.data);
        if (str.length > MaxLength) {
            throw new SRC44ValidationException(`Profile data exceeds maximum allowed length of ${MaxLength} bytes - Got ${str.length}`);
        }
        return str;
    }

    /**
     * Estimates the minimum transaction fee for the given payload
     * @param baseFee The baseFee for calculation in planck. Default is 0.2 SIGNA = 20000000 Planck
     * @return fee in Planck
     */
    public estimateFeePlanck(baseFee = 2000_0000): string {
        return String(Math.ceil(this.stringify().length / 184) * baseFee);
    }
}

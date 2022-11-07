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

    public static create(name: string) {
        return new ProfileData({
            vs: 1,
            nm: name,
        });
    }

    public static parse(jsonString: string) {
        try {
            const profile = JSON.parse(jsonString);
            return new ProfileData(profile);
        // @ts-ignore
        } catch (e: any) {
            throw new SRC44ParseException(e.message);
        }
    }

    getCustomField(fieldName: string) {
        return this.data[fieldName];
    }

    get(): Profile {
        const {vs, nm, ds, tp, av, bg, hp, sc, sr, xt, al, ...custom} = this.data;
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
            ...custom
        };
    }

    public validate() {
        validateSRC44(this.raw);
    }

    public stringify(): string {
        const MaxLength = 1000;
        const str = JSON.stringify(this.data);
        if (str.length > MaxLength) {
            throw new SRC44ValidationException(`Profile data exceeds maximum allowed length of ${MaxLength} bytes - Got ${str.length}`);
        }
        return str;
    }
}

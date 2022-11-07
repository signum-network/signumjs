/**
 * Copyright (c) 2022 Signum Network
 */
import {sanitizeUrl} from '@braintree/sanitize-url';
import {SRC44ProfileType} from './typings';
import {ProfileData} from './profileData';

/**
 * Profile Data Builder
 *
 * Creates SRC44-compliant [[ProfileData]] object to be used as description in Smart Contracts, Account Info, and/or Aliases
 * @module standards.SRC44
 */
export class ProfileDataBuilder {

    private constructor() {
    }

    private data: ProfileData;

    public static create(name: string) {
        const builder = new ProfileDataBuilder();
        builder.data = ProfileData.create(name);
        return builder;
    }

    setSendRule(regex: string) {
        this.data.raw.sr = regex;
        return this;
    }

    setHomePage(url: string) {
        this.data.raw.hp = sanitizeUrl(url);
        return this;
    }

    setSocialMediaLinks(urls: string[]) {
        this.data.raw.sc = urls.map(sanitizeUrl);
        return this;
    }

    setAlias(a: string) {
        this.data.raw.al = a.startsWith('@') ? a : `@${a}`;
        return this;
    }


    setType(t: SRC44ProfileType) {
        this.data.raw.tp = t;
        return this;
    }

    setExtension(e: string) {
        this.data.raw.xt = e;
        return this;
    }

    setAvatar(ipfsCid: string, imageMimeTye: string) {
        this.data.raw.av = {
            [ipfsCid]: imageMimeTye
        };
        return this;
    }

    setBackground(ipfsCid: string, imageMimeTye: string) {
        this.data.raw.bg = {
            [ipfsCid]: imageMimeTye
        };
        return this;
    }

    build() {
        this.data.validate();
        return this.data;
    }

    setDescription(d: string) {
        this.data.raw.ds = d;
        return this;
    }

    setCustomField(fieldName: string, value: string) {
        this.data.raw[fieldName] = value;
        return this;
    }
}

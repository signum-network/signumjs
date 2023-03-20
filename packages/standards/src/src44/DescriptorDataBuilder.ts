/**
 * Copyright (c) 2022 Signum Network
 */
import {sanitizeUrl} from '@braintree/sanitize-url';
import {SRC44DescriptorType} from './typings';
import {DescriptorData} from './DescriptorData';

/**
 * Descriptor Data Builder
 *
 * ```ts
 * const descriptorData = DescriptorDataBuilder
 *     .create('Some name')
 *     .setBackground('QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc', 'image/jpeg')
 *     .setAvatar('QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', 'image/gif')
 *     .setSocialMediaLinks(['https://somelink.com'])
 *     .setAlias('alias')
 *     .setCustomField('xc', 'value')
 *     .setDescription('description')
 *     .setExtension('QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc')
 *     .setHomePage('https://homepage.com')
 *     .setType('oth')
 *     .setSendRule('^[a-Z]{3}$')
 *     .build();
 * ```
 *
 * Creates SRC44-compliant [[DescriptorData]] object to be used as description in Smart Contracts, Account Info, and/or Aliases
 * @module standards.SRC44
 */
export class DescriptorDataBuilder {

    private constructor() {
    }

    private data: DescriptorData;

    /**
     * Creates the builder instance. See also [[DescriptorDataBuilder.build]]
     * @param name The name for the descriptor/profile
     */
    public static create(name?: string) {
        const builder = new DescriptorDataBuilder();
        builder.data = DescriptorData.create(name);
        return builder;
    }

    /**
     * Creates the builder instance from an existing [[DescriptorData]]
     * @param descriptor The descriptor data
     */
    public static createWith(descriptor: DescriptorData) {
        const builder = new DescriptorDataBuilder();
        builder.data = descriptor;
        return builder;
    }

    setName(name: string) {
        this.data.raw.nm = name;
        return this;
    }

    setSendRule(regex: string) {
        this.data.raw.sr = regex;
        return this;
    }

    setAccount(accountId: string) {
        this.data.raw.ac = accountId;
        return this;
    }

    setId(id: string) {
        this.data.raw.id = id;
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

    setAlias(a: string, tld?:string) {
        this.data.raw.al = tld ? `${a}.${tld}` : a;
        return this;
    }

    setType(t: SRC44DescriptorType) {
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

    setDescription(d: string) {
        this.data.raw.ds = d;
        return this;
    }

    setCustomField(fieldName: string, value: string) {
        this.data.raw[fieldName] = value;
        return this;
    }

    /**
     * Builds the final [[DescriptorData]] instance. See also [[DescriptorDataBuilder.create]]
     */
    build() {
        this.data.validate();
        return this.data;
    }
}

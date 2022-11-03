import {validateJson} from '../internal/validateJson';
import profileSchema from './ajv/schema-profile.json';
import {src44} from './ajv/validators';
import {Src44Profile} from './typings/src44Profile';
import {SRC44ParseException} from './exceptions/src44ParseException';
import {sanitizeUrl} from '@braintree/sanitize-url';
import {SRC44ProfileType} from './typings/src44ProfileType';

const MaxLength = 1000;

export class ProfileData {

    private constructor(private data: Src44Profile) {
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

    get description() {
        return this.data.ds;
    }

    set description(d: string){
        if(d.length > 384){
            // todo: c
        }
    }

    get type(): SRC44ProfileType {
        return this.data.tp;
    }

    get extension() {
        return this.data.xt;
    }

    get avatar() {
        return this.getIpfsMedia(this.data.av);
    }

    get background() {
        return this.getIpfsMedia(this.data.bg);
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

    get alias() {
        return this.data.al;
    }

    public static create(name: string) {
        return new ProfileData({
            vs: 1,
            nm: name,
        });
    }

    public static parse(jsonString: string) {
        try {
            if (jsonString.length > MaxLength) {
                throw new Error(`Profile data exceeds maximum allowed length of ${MaxLength} bytes - Got ${jsonString.length}`);
            }

            const profile = JSON.parse(jsonString);

            const {isValid, error} = validateJson({
                data: profile,
                schema: profileSchema,
                validator: src44,
            });

            if (!isValid) {
                throw new Error(error);
            }

            return new ProfileData(profile);

        } catch (e) {
            throw new SRC44ParseException(e.message);
        }
    }

    getCustomField(fieldName: string) {
        return this.data[fieldName];
    }

    get() {
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
        // TODO
    }

    private getIpfsMedia(o: any) {
        if (!o) {
            return undefined;
        }
        const keys = Object.keys(o);
        if (keys.length === 1) {
            const ipfsCid = keys[0];
            const mimeType = o[ipfsCid];
            if (!mimeType.startsWith('image')) {
                throw new SRC44ParseException(`Only image Mime Types allowed. Got [${mimeType}]`);
            }
            return {
                ipfsCid,
                mimeType
            };
        }
    }

    public stringify(): string {
        const str = JSON.stringify(this.data);
        if (str.length > MaxLength) {
            throw new SRC44ParseException(`Profile data exceeds maximum allowed length of ${MaxLength} bytes - Got ${str.length}`);
        }
        return str;
    }
}

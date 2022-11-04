import {sanitizeUrl} from '@braintree/sanitize-url';
import {SRC44ProfileType} from './typings/src44ProfileType';
import {ProfileData} from './profileData';

export class ProfileDataBuilder {
    private data: ProfileData;

    setSendRule(regex: string) {
        this.data.raw.sr = regex;
        return this;
    }

     setHomePage(url: string) {
        this.data.raw.hp = sanitizeUrl(url);
        return this;
    }

    setSocialMediaLinks( urls: string[]) {
        this.data.raw.sc = urls.map(sanitizeUrl);
        return this;
    }

    setAlias(a: string) {
        this.data.raw.al = a;
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

    create(name: string) {
        this.data =  ProfileData.create(name);
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

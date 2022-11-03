import {Ledger} from '@signumjs/core';


export class ProfileDataViewer {
    constructor(private ledger: Ledger) {
    }

    public async fetch(accountId: string) {

    }

    public async fetchFromAlias(aliasName: string) {
        const alias = await this.ledger.alias.getAliasByName(aliasName);
        const content = alias.aliasURI;
        return Promise.resolve({});
    }

}

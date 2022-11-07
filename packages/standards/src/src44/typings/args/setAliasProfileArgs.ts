import {ProfileData} from '../../profileData';

export interface SetAliasProfileArgs {
    aliasName: string;
    profileData: ProfileData;
    feePlanck: string;
    senderPublicKey: string;
    senderPrivateKey?: string;
    deadline?: number;
    referencedTransactionFullHash?: string;
}

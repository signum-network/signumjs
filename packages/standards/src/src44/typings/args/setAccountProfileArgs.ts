import {ProfileData} from '../../profileData';

export interface SetAccountProfileArgs {
    name?: string;
    profileData: ProfileData;
    feePlanck?: string;
    senderPublicKey: string;
    senderPrivateKey?: string;
    deadline?: number;
    referencedTransactionFullHash?: string;
}

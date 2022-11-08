import {ProfileData} from '../../profileData';

/**
 * Arguments for [[ProfileDataClient.setAccountProfile]]
 * @module standards.SRC44
 */
export interface SetAccountProfileArgs {
    name?: string;
    profileData: ProfileData;
    /**
     * If not given the minimum transaction fee is being calculated
     */
    feePlanck?: string;
    senderPublicKey: string;
    senderPrivateKey?: string;
    deadline?: number;
    referencedTransactionFullHash?: string;
}

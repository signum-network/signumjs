import {ProfileData} from '../../profileData';

/**
 * Arguments for [[ProfileDataClient.setAssetBranding]]
 * @module standards.SRC44
 */
export interface SetAssetBrandingArgs {
    /**
     * Optional name for the used brand alias. If not given an auto-generated name will be used.
     */
    aliasName?: string;
    /**
     * The related assetId
     */
    assetId: string;
    /**
     * Additional Profile Data. Mind, that id will be set to assetId.
     */
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

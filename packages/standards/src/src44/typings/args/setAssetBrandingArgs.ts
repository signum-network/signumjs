import {DescriptorData} from '../../DescriptorData';

/**
 * Arguments for [[DescriptorDataClient.setAssetBranding]]
 * @module standards.SRC44
 */
export interface SetAssetBrandingArgs {
    /**
     * Optional name for the used brand alias. If not given an auto-generated name will be used.
     */
    aliasName?: string;

    /**
     * Optional Top Level Domain
     */
    tld?: string;
    /**
     * The related assetId
     */
    assetId: string;
    /**
     * Additional Descriptor Data. Mind, that id will be set to assetId.
     */
    descriptorData: DescriptorData;
    /**
     * If not given the minimum transaction fee is being calculated
     */
    feePlanck?: string;
    senderPublicKey: string;
    senderPrivateKey?: string;
    deadline?: number;
    referencedTransactionFullHash?: string;
}

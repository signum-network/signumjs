import {DescriptorData} from '../../DescriptorData';

/**
 * Arguments for [[DescriptorDataClient.setAliasDescriptor]]
 * @module standards.SRC44
 */
export interface SetAliasDescriptorArgs {
    aliasName: string;
    /**
     * Optional Top Level Domain, if not given 'signum' (as per default) is used
     */
    tld?: string;
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

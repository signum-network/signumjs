import {DescriptorData} from '../../DescriptorData';

/**
 * Arguments for {@link DescriptorDataClient.setAccountDescriptor}
 * @category SRC44
 */
export interface SetAccountDescriptorArgs {
    name?: string;
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

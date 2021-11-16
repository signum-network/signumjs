/**
 * The argument object for [[ContractApi.publishContractByReference]]
 *
 * @param activationAmountPlanck {string} The amount in planck needed to execute the contract
 * @param feePlanck {string} The fee in Planck to pay for deployment. As this does not depend on payload size, the common fee regime applies.
 * @param referencedTransaction {string} Reference, i.e. Transaction Id, to the already deployed contract
 * @param deadline {number} Optional deadline in minutes, default is 1440
 * @param description {string} The description of your contract (max. 1000 chars)
 * @param name {string} The name for the contract
 * @param senderPrivateKey {string} The senders private key to sign the transaction
 * @param senderPublicKey {string} The senders public key
 * @module core
 *
 * @see Consider publishing by reference also, which is way cheaper: [[ContractApi.publishContract]]
 */
export interface PublishContractByReferenceArgs {
    activationAmountPlanck: string;
    feePlanck: string;
    deadline?: number;
    description: string;
    name: string;
    senderPublicKey: string;
    senderPrivateKey: string;
    referencedTransaction?: string;
}

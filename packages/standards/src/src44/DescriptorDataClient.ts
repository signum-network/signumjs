/**
 * Copyright (c) 2022 Signum Network
 */
import {Ledger, Account} from '@signumjs/core';
import {DescriptorData} from './DescriptorData';
import {Descriptor} from './typings';
import {SetAccountDescriptorArgs} from './typings/args/setAccountDescriptorArgs';
import {SetAliasDescriptorArgs} from './typings/args/setAliasDescriptorArgs';
import {SetAssetBrandingArgs} from './typings/args/setAssetBrandingArgs';
import {SetContractBrandingArgs} from './typings/args/setContractBrandingArgs';


/**
 * Descriptor Data Client
 *
 * ```ts
 *  const ledger = LedgerClientFactory.create({nodeHost: "https://europe.signum.network"})
 *  const client = new DescriptorDataClient(ledger);
 *  const descriptorData = DescriptorDataBuilder
 *                         .create('ohager')
 *                         .setType('hum')
 *                         .setBackground('QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc', 'image/jpeg')
 *                         .setAvatar('QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', 'image/gif')
 *                         .setSocialMediaLinks(['https://somelink.com'])
 *                         .setDescription('Just a humble dev...')
 *                         .setHomePage('https://digital-independence.dev')
 *                         .build();
 *  const transaction = await client.setAccountDescriptor({
 *                  descriptorData: DescriptorDataBuilder.create('descriptor').build(),
 *                 senderPublicKey: '497d559d18d989b8....ed2716a4b2121902',
 *                 senderPrivateKey: '**********************************'
 *                 });
 * ```
 *
 * A helper class to get Descriptor information from accounts, contracts, assets, and/or aliases.
 * It even resolves Descriptor data from referenced aliases.
 * Furthermore, it helps on updating descriptor data according to SRC44 specifications.
 * 
 */
export class DescriptorDataClient {
    private static readonly SmartContractPublicKey = '0000000000000000000000000000000000000000000000000000000000000000';

    /**
     * Instantiates the client.
     * Mind the dependency of the ledger client.
     * @param ledger
     */
    constructor(private readonly ledger: Ledger) {
    }

    /**
     * Gets the descriptor data from a contract. It also resolved referenced alias descriptor
     *
     * Contract descriptions are immutable and can be set only on contract deployment.
     * As this client does not deploy contracts, no setters/updaters for contracts are provided
     *
     * @param contractId The contract id
     * @return The fetched Descriptor data. It might throw exceptions if it has no compatible data.
     */
    async getFromContract(contractId: string): Promise<Descriptor> {
        const contract = await this.ledger.contract.getContract(contractId);
        const descriptor = DescriptorData.parse(contract.description).get();
        if (descriptor.alias) {
            descriptor.resolvedAlias = await this.getFromAlias(descriptor.alias);
        }
        return descriptor;
    }


    /**
     * Gets the descriptor data from an asset/token. It also resolved referenced alias descriptor
     *
     * Asset descriptions are immutable and can be set only on issuance.
     * As this client does not issue assets, no setters/updaters are provided
     *
     * @param assetId The token/asset id
     * @return The fetched Descriptor data. It might throw exceptions if it has no compatible data.
     */
    async getFromAsset(assetId: string): Promise<Descriptor> {
        const asset = await this.ledger.asset.getAsset({assetId});
        const descriptor = DescriptorData.parse(asset.description).get();
        if (descriptor.alias) {
            descriptor.resolvedAlias = await this.getFromAlias(descriptor.alias);
        }
        return descriptor;
    }

    /**
     * Sets an accounts descriptor data.
     * If `feePlanck` is not given, the minimum costs will be calculated automatically
     * @param args The arguments
     */
    async setAccountDescriptor(args: SetAccountDescriptorArgs) {
        const {name, senderPublicKey, senderPrivateKey, feePlanck, descriptorData, deadline, referencedTransactionFullHash} = args;
        return this.ledger.account.setAccountInfo({
            name: name || descriptorData.name,
            description: descriptorData.stringify(),
            feePlanck: feePlanck || descriptorData.estimateFeePlanck(),
            senderPublicKey,
            senderPrivateKey,
            deadline,
            referencedTransactionFullHash
        });
    }

    /**
     * Tries to resolve an account by its alias Name
     * @param aliasName
     * @return The account, if resolvable (alias exists, and points to an account), or null
     */
    async getAccountByAlias(aliasName: string): Promise<Account | null> {
        try {
            const descriptor = await this.getFromAlias(aliasName);
            if (descriptor.account) {
                return this.ledger.account.getAccount({accountId: descriptor.account, includeCommittedAmount: true});
            }
            return null;
            // @ts-ignore
        } catch (e: any) {
            return null;
        }
    }

    /**
     * Branded Assets are constructed indirectly to allow already existing Tokens/Assets to have additional
     * (brand) data. Branded Assets link an alias with SRC44 compliant data checking for identity of issuer and alias owner.
     * Only if those match, the descriptor data is being returned.
     *
     * If the token issuer is a contract, then the contracts creator is being used for identity matching
     * Due to the indirection it's possible to have multiple brands.
     *
     * See also {@link setAssetBranding}
     * @param tokenId
     * @returns An array of descriptors/brands - can be empty
     */
    async getAssetBranding(tokenId: string): Promise<Descriptor[]> {
        try {
            let issuer = '';
            const {account, publicKey} = await this.ledger.asset.getAsset({
                assetId: tokenId
            });
            if (publicKey === DescriptorDataClient.SmartContractPublicKey) {
                const {creator} = await this.ledger.contract.getContract(account);
                issuer = creator;
            } else {
                issuer = account;
            }
            const descriptors: Descriptor[] = [];
            const issuerAliases = await this.ledger.alias.getAliases({accountId: issuer});
            for (const alias of issuerAliases.aliases) {
                try {
                    const descriptorData = DescriptorData.parse(alias.aliasURI);
                    if (descriptorData.id === tokenId) {
                        descriptors.push(descriptorData.get());
                    }
                    // @ts-ignore
                } catch (e: any) {
                    // ignore non-SRC44 accounts
                }
            }
            return descriptors;
            // @ts-ignore
        } catch (e: any) {
            return [] as Descriptor[];
        }
    }

    /**
     * Creates a brand for an asset.
     * See also {@link getAssetBranding}
     *
     * If the asset is issued by a contract, the contracts creator is being checked for ownership.
     *
     * @param args The args
     * @return Transaction Id if successful
     * @throws Error on not found asset, or if sender is not owner of the asset
     */
    async setAssetBranding(args: SetAssetBrandingArgs) {
        const {
            aliasName,
            assetId,
            senderPublicKey,
            senderPrivateKey,
            feePlanck,
            descriptorData,
            deadline,
            referencedTransactionFullHash,
            tld,
        } = args;

        const [asset, sender] = await Promise.all([
            this.ledger.asset.getAsset({assetId}),
            this.ledger.service.query<{ account: string }>('getAccountId', {publicKey: senderPublicKey})
        ]);

        // @ts-ignore
        const {publicKey, account} = asset;
        let assetOwner = '';
        if (publicKey === DescriptorDataClient.SmartContractPublicKey) {
            const {creator} = await this.ledger.contract.getContract(account);
            assetOwner = creator;
        } else {
            assetOwner = account;
        }

        if (sender.account !== assetOwner) {
            throw new Error('Not your asset!');
        }

        descriptorData.raw.id = assetId;
        return this.ledger.alias.setAlias({
            aliasName: aliasName || `asset_brand_${assetId}`,
            tld,
            aliasURI: descriptorData.stringify(),
            feePlanck: feePlanck || descriptorData.estimateFeePlanck(),
            senderPublicKey,
            senderPrivateKey,
            deadline,
            referencedTransactionFullHash
        });
    }

    /**
     * Branded Contracts are almost identical with Branded Assets. See {@link getAssetBranding} and {@link setContractBranding}
     * @param contractId The contract Id
     * @returns An array of descriptors/brands - can be empty
     */
    async getContractBranding(contractId: string): Promise<Descriptor[]> {
        try {
            const {creator} = await this.ledger.contract.getContract(contractId);
            const descriptors: Descriptor[] = [];
            const issuerAliases = await this.ledger.alias.getAliases({accountId: creator});
            for (const alias of issuerAliases.aliases) {
                try {
                    const descriptorData = DescriptorData.parse(alias.aliasURI);
                    if (descriptorData.id === contractId) {
                        descriptors.push(descriptorData.get());
                    }
                    // @ts-ignore
                } catch (e: any) {
                    // ignore non-SRC44 accounts
                }
            }
            return descriptors;
            // @ts-ignore
        } catch (e: any) {
            return [] as Descriptor[];
        }
    }

    /**
     * Set contract branding. See {@link getContractBranding}
     * @param args The args
     * @throws Error on not found contract, or if sender is not owner of the contract
     * */
    async setContractBranding(args: SetContractBrandingArgs) {
        const {
            aliasName,
            contractId,
            senderPublicKey,
            senderPrivateKey,
            feePlanck,
            descriptorData,
            deadline,
            referencedTransactionFullHash,
            tld
        } = args;
        const [contract, sender] = await Promise.all([
            this.ledger.contract.getContract(contractId),
            this.ledger.service.query<{ account: string }>('getAccountId', {publicKey: senderPublicKey})
        ]);

        if (sender.account !== contract.creator) {
            throw new Error('Not your contract!');
        }

        descriptorData.raw.id = contractId;
        return this.ledger.alias.setAlias({
            aliasName: aliasName || `contract_brand_${contractId}`,
            tld,
            aliasURI: descriptorData.stringify(),
            feePlanck: feePlanck || descriptorData.estimateFeePlanck(),
            senderPublicKey,
            senderPrivateKey,
            deadline,
            referencedTransactionFullHash
        });
    }

    /**
     * Gets the descriptor data from an account. It also resolved referenced alias descriptor
     * @param accountId The account id
     * @return The fetched Descriptor data. It might throw exceptions if it has no compatible data.
     */
    async getFromAccount(accountId: string): Promise<Descriptor> {
        const account = await this.ledger.account.getAccount({accountId, includeCommittedAmount: false, includeEstimatedCommitment: false});
        const descriptor = DescriptorData.parse(account.description).get();
        if (descriptor.alias) {
            descriptor.resolvedAlias = await this.getFromAlias(descriptor.alias);
        }
        return descriptor;
    }

    /**
     * Sets an alias descriptor data.
     * If `feePlanck` is not given, the minimum costs will be calculated automatically
     * @param args The arguments
     */
    async setAliasDescriptor(args: SetAliasDescriptorArgs) {
        const {tld, aliasName, senderPublicKey, senderPrivateKey, feePlanck, descriptorData, deadline, referencedTransactionFullHash} = args;
        return this.ledger.alias.setAlias({
            aliasName,
            tld,
            aliasURI: descriptorData.stringify(),
            feePlanck: feePlanck || descriptorData.estimateFeePlanck(),
            senderPublicKey,
            senderPrivateKey,
            deadline,
            referencedTransactionFullHash
        });
    }

    /**
     * Gets descriptor data from an alias.
     * @param aliasName The unique alias name (can have a TLD attached using `:`, like `myalias:mytld`)
     * @throws If the alias does not have compatible descriptor data
     */
    async getFromAlias(aliasName: string): Promise<Descriptor> {
        const [name, tld] = aliasName.split(':');
        const {aliasURI} = await this.ledger.alias.getAliasByName(name, tld);
        return DescriptorData.parse(aliasURI).get();
    }

}

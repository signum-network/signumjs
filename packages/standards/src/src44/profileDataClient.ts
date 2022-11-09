/**
 * Copyright (c) 2022 Signum Network
 */
import {Ledger, Account, Address} from '@signumjs/core';
import {ProfileData} from './profileData';
import {Profile} from './typings';
import {SetAccountProfileArgs} from './typings/args/setAccountProfileArgs';
import {SetAliasProfileArgs} from './typings/args/setAliasProfileArgs';
import {SetAssetBrandingArgs} from './typings/args/setAssetBrandingArgs';
import {SetContractBrandingArgs} from './typings/args/setContractBrandingArgs';


/**
 * Profile Data Client
 *
 * ```ts
 *  const ledger = LedgerClientFactory.create({nodeHost: "https://europe.signum.network"})
 *  const client = new ProfileDataClient(ledger);
 *  const profileData = ProfileDataBuilder
 *                         .create('ohager')
 *                         .setType('hum')
 *                         .setBackground('QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc', 'image/jpeg')
 *                         .setAvatar('QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', 'image/gif')
 *                         .setSocialMediaLinks(['https://somelink.com'])
 *                         .setDescription('Just a humble dev...')
 *                         .setHomePage('https://digital-independence.dev')
 *                         .build();
 *  const transaction = await client.setAccountProfile({
 *                  profileData: ProfileDataBuilder.create('profile').build(),
 *                 senderPublicKey: '497d559d18d989b8....ed2716a4b2121902',
 *                 senderPrivateKey: '**********************************'
 *                 });
 * ```
 *
 * A helper class to get Profile information from accounts, contracts, assets, and/or aliases.
 * It even resolves Profile data from referenced aliases.
 * Furthermore, it helps on updating profile data according to SRC44 specifications.
 * @module standards.SRC44
 */
export class ProfileDataClient {
    private static SmartContractPublicKey = '0000000000000000000000000000000000000000000000000000000000000000';
    /**
     * Instantiates the client.
     * Mind the dependency of the ledger client.
     * @param ledger
     */
    constructor(private ledger: Ledger) {
    }

    /**
     * Gets the profile data from a contract. It also resolved referenced alias profile
     *
     * Contract descriptions are immutable and can be set only on contract deployment.
     * As this client does not deploy contracts, no setters/updaters for contracts are provided
     *
     * @param contractId The contract id
     * @return The fetched Profile data. It might throw exceptions if it has no compatible data.
     */
    async getFromContract(contractId: string): Promise<Profile> {
        const contract = await this.ledger.contract.getContract(contractId);
        const profile = ProfileData.parse(contract.description).get();
        if (profile.alias) {
            profile.resolvedAlias = await this.getFromAlias(profile.alias);
        }
        return profile;
    }


    /**
     * Gets the profile data from an asset/token. It also resolved referenced alias profile
     *
     * Asset descriptions are immutable and can be set only on issuance.
     * As this client does not issue assets, no setters/updaters are provided
     *
     * @param assetId The token/asset id
     * @return The fetched Profile data. It might throw exceptions if it has no compatible data.
     */
    async getFromAsset(assetId: string): Promise<Profile> {
        const asset = await this.ledger.asset.getAsset({assetId});
        const profile = ProfileData.parse(asset.description).get();
        if (profile.alias) {
            profile.resolvedAlias = await this.getFromAlias(profile.alias);
        }
        return profile;
    }

    /**
     * Sets an accounts profile data.
     * If `feePlanck` is not given, the minimum costs will be calculated automatically
     * @param args The arguments
     */
    async setAccountProfile(args: SetAccountProfileArgs) {
        const {name, senderPublicKey, senderPrivateKey, feePlanck, profileData, deadline, referencedTransactionFullHash} = args;
        return this.ledger.account.setAccountInfo({
            name: name || profileData.name,
            description: profileData.stringify(),
            feePlanck: feePlanck || profileData.estimateFeePlanck(),
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
            const profile = await this.getFromAlias(aliasName);
            if (profile.account) {
                return this.ledger.account.getAccount({accountId: profile.account, includeCommittedAmount: true});
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
     * Only if those match, the profile data is being returned.
     *
     * If the token issuer is a contract, then the contracts creator is being used for identity matching
     * Due to the indirection it's possible to have multiple brands.
     *
     * See also [[setAssetBranding]]
     * @param tokenId
     * @returns An array of profiles/brands - can be empty
     */
    async getAssetBranding(tokenId: string): Promise<Profile[]> {
        try {
            let issuer = '';
            const {account, publicKey} = await this.ledger.asset.getAsset({
                assetId: tokenId
            });
            if (publicKey === ProfileDataClient.SmartContractPublicKey) {
                const {creator} = await this.ledger.contract.getContract(account);
                issuer = creator;
            } else {
                issuer = account;
            }
            const profiles: Profile[] = [];
            const issuerAliases = await this.ledger.account.getAliases(issuer);
            for (const alias of issuerAliases.aliases) {
                try {
                    const profileData = ProfileData.parse(alias.aliasURI);
                    if (profileData.id === tokenId) {
                        profiles.push(profileData.get());
                    }
                    // @ts-ignore
                } catch (e: any) {
                    // ignore non-SRC44 accounts
                }
            }
            return profiles;
            // @ts-ignore
        } catch (e: any) {
            return [] as Profile[];
        }
    }

    /**
     * Creates a brand for an asset.
     * See also [[getAssetBranding]]
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
            profileData,
            deadline,
            referencedTransactionFullHash
        } = args;

        const [asset, sender] = await Promise.all([
            this.ledger.asset.getAsset({assetId}),
            this.ledger.service.query<{ account: string }>('getAccountId', {publicKey: senderPublicKey})
        ]);

        // @ts-ignore
        const {publicKey, account} = asset;
        let assetOwner = '';
        if (publicKey === ProfileDataClient.SmartContractPublicKey) {
            const {creator} = await this.ledger.contract.getContract(account);
            assetOwner = creator;
        } else {
            assetOwner = account;
        }

        if (sender.account !== assetOwner) {
            throw new Error('Not your asset!');
        }

        profileData.raw.id = assetId;
        return this.ledger.alias.setAlias({
            aliasName: aliasName || `asset-brand-${assetId}`,
            aliasURI: profileData.stringify(),
            feePlanck: feePlanck || profileData.estimateFeePlanck(),
            senderPublicKey,
            senderPrivateKey,
            deadline,
            referencedTransactionFullHash
        });
    }

    /**
     * Branded Contracts are almost identical with Branded Assets. See [[getAssetBranding]] and [[setContractBranding]]
     * @param contractId The contract Id
     * @returns An array of profiles/brands - can be empty
     */
    async getContractBranding(contractId: string): Promise<Profile[]> {
        try {
            const {creator} = await this.ledger.contract.getContract(contractId);
            const profiles: Profile[] = [];
            const issuerAliases = await this.ledger.account.getAliases(creator);
            for (const alias of issuerAliases.aliases) {
                try {
                    const profileData = ProfileData.parse(alias.aliasURI);
                    if (profileData.id === contractId) {
                        profiles.push(profileData.get());
                    }
                    // @ts-ignore
                } catch (e: any) {
                    // ignore non-SRC44 accounts
                }
            }
            return profiles;
            // @ts-ignore
        } catch (e: any) {
            return [] as Profile[];
        }
    }

    /**
     * Set contract branding. See [[getContractBranding]]
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
            profileData,
            deadline,
            referencedTransactionFullHash
        } = args;
        const [contract, sender] = await Promise.all([
            this.ledger.contract.getContract(contractId),
            this.ledger.service.query<{ account: string }>('getAccountId', {publicKey: senderPublicKey})
        ]);

        if (sender.account !== contract.creator) {
            throw new Error('Not your contract!');
        }

        profileData.raw.id = contractId;
        return this.ledger.alias.setAlias({
            aliasName: aliasName || `contract-brand-${contractId}`,
            aliasURI: profileData.stringify(),
            feePlanck: feePlanck || profileData.estimateFeePlanck(),
            senderPublicKey,
            senderPrivateKey,
            deadline,
            referencedTransactionFullHash
        });
    }

    /**
     * Gets the profile data from an account. It also resolved referenced alias profile
     * @param accountId The account id
     * @return The fetched Profile data. It might throw exceptions if it has no compatible data.
     */
    async getFromAccount(accountId: string): Promise<Profile> {
        const account = await this.ledger.account.getAccount({accountId, includeCommittedAmount: false, includeEstimatedCommitment: false});
        const profile = ProfileData.parse(account.description).get();
        if (profile.alias) {
            profile.resolvedAlias = await this.getFromAlias(profile.alias);
        }
        return profile;
    }

    /**
     * Sets an alias profile data.
     * If `feePlanck` is not given, the minimum costs will be calculated automatically
     * @param args The arguments
     */
    async setAliasProfile(args: SetAliasProfileArgs) {
        const {aliasName, senderPublicKey, senderPrivateKey, feePlanck, profileData, deadline, referencedTransactionFullHash} = args;
        return this.ledger.alias.setAlias({
            aliasName,
            aliasURI: profileData.stringify(),
            feePlanck: feePlanck || profileData.estimateFeePlanck(),
            senderPublicKey,
            senderPrivateKey,
            deadline,
            referencedTransactionFullHash
        });
    }

    /**
     * Gets profile data from an alias.
     * @param aliasName The unique alias name
     * @throws If the alias does not have compatible profile data
     */
    async getFromAlias(aliasName: string): Promise<Profile> {
        const {aliasURI} = await this.ledger.alias.getAliasByName(aliasName);
        return ProfileData.parse(aliasURI).get();
    }

}

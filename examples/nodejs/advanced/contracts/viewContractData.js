const inquirer = require("inquirer");
const {Address} = require("@signumjs/core");
const {ContractDataView} = require("@signumjs/contracts");
const {Amount} = require("@signumjs/util");
const {provideLedger, handleError, LedgerHostUrls} = require('../../helper');


/**
 * This is an example of how to read data from a contract
 *
 * Usually, contracts maintain a certain internal state, like ownership, paid dividends or whatever
 * These data is publicly accessible and can be read relatively easily using ContractDataView
 * The requirement is that you know the positions of the values in the contracts data stack.
 * The data stack is divided into 8 byte segments and can be addressed using indices.
 *
 * The following example uses parts of the layout of the NFTSRC40 contract.
 *
 * If you use your custom contracts, you might want to use the Contract Inspector to see you data stack
 *
 * https://contracts-inspector.ohager.vercel.app/
 *
 */
const NftContractDataIndex = {
    Owner: 0,
    Status: 1,
    CurrentPrice: 2,
    PlatformAddress: 3,
    PlatformFee: 4,
    RoyaltiesFee: 5,
    RoyaltiesOwner: 6,
    HighestBidder: 19,
    TotalTimesSold: 27,
    TotalBidsReceived: 28,
    TotalRoyaltiesFee: 29,
    TotalPlatformFee: 30,
    TotalLikes: 31,
}

// using a dedicated class for contract data view is a nice pattern
class NftDataView {
    constructor(contract) {
        this.id = contract.at;
        this.view = new ContractDataView(contract);
    }

    getId() {
        return this.id;
    }

    getOwnerId() {
        return this.view.getVariableAsDecimal(NftContractDataIndex.Owner);
    }

    getRoyaltiesOwnerId() {
        return this.view.getVariableAsDecimal(NftContractDataIndex.RoyaltiesOwner);
    }

    getPlatformId() {
        return this.view.getVariableAsDecimal(NftContractDataIndex.PlatformAddress);
    }

    getPlatformFee() {
        return parseInt(
            this.view.getVariableAsDecimal(NftContractDataIndex.PlatformFee),
            10
        );
    }

    getRoyaltiesFee() {
        return parseInt(
            this.view.getVariableAsDecimal(NftContractDataIndex.RoyaltiesFee),
            10
        );
    }

    getStatus() {
        const status = this.view.getVariableAsDecimal(NftContractDataIndex.Status);
        switch (status) {
            case "1":
                return "For Sale";
            case "2":
                return "For Auction";
            case "0":
            default:
                return "Not For Sale"
        }
    }

    getCurrentPrice() {
        return Amount.fromPlanck(
            this.view.getVariableAsDecimal(NftContractDataIndex.CurrentPrice)
        )
    }

    getHighestBidder() {
        return this.view.getVariableAsDecimal(NftContractDataIndex.HighestBidder);
    }

    getTotalTimesSold() {
        return parseInt(
            this.view.getVariableAsDecimal(NftContractDataIndex.TotalTimesSold),
            10
        );
    }

    getTotalBidsReceived() {
        return parseInt(
            this.view.getVariableAsDecimal(NftContractDataIndex.TotalBidsReceived),
            10
        );
    }

    getTotalRoyaltiesFee() {
        return BigInt(
            this.view.getVariableAsDecimal(NftContractDataIndex.TotalRoyaltiesFee)
        );
    }

    getTotalPlatformFee() {
        return BigInt(
            this.view.getVariableAsDecimal(NftContractDataIndex.TotalPlatformFee)
        );
    }

    getTotalLikes() {
        return parseInt(
            this.view.getVariableAsDecimal(NftContractDataIndex.TotalLikes)
        );
    }
}


/**
 * Just a helper function to ask for the account id/address
 */
function askForNftId() {
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'ledger',
                choices: ['TestNet', 'MainNet'],
                default: 'TestNet',
            },
            {
                type: 'input',
                name: 'nft',
                message: 'Please enter the NFTs Id or Address?'
            }
        ])
}

function asAddress(id, prefix){
    return Address.fromNumericId(id, prefix).getReedSolomonAddress()
}

/**
 * This advanced example shows how to interact with smart contracts, i.e. how to call methods
 */
async function showNftData(params) {
    try {

        const {ledger: ledgerChoice, nft} = params;

        // here we instantiate the ledger api
        const ledger = provideLedger(LedgerHostUrls[ledgerChoice])


        // this way we not only convert the contracts address to its id, but this method also asserts
        // that we have a formally valid address. It's not guaranteed that the address really exists in the chain
        const nftId = Address.create(nft).getNumericId()

        const nftContract = await ledger.contract.getContract(nftId)
        const explorerUrl = ledgerChoice === 'TestNet' ? `https://t-chain.signum.network/at/${nftId}` : `https://chain.signum.network/at/${nftId}`
        const prefix = ledgerChoice === 'TestNet'? 'TS' : 'S'
        const nftDataView = new NftDataView(nftContract)

        console.info(`Stats of NFT '${asAddress(nftId, prefix)}' - ${explorerUrl}`)
        console.info('----------------------------------------')
        console.info('Creator:', nftContract.creatorRS)
        console.info('Current Owner:', asAddress(nftDataView.getOwnerId(),prefix))
        console.info('Current Price:', nftDataView.getCurrentPrice().getSigna(), 'SIGNA')
        console.info('Current Status:', nftDataView.getStatus())
        console.info('Number of Sales:', nftDataView.getTotalTimesSold())
        console.info('Likes:', nftDataView.getTotalLikes())
        // ...
    } catch (e) {
        // If the API returns an exception,
        // the return error object is of type HttpError
        handleError(e);
    }
}

(async () => {
    const params = await askForNftId();
    await showNftData(params);
})();

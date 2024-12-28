import {DefaultSendArgs} from './defaultSendArgs';


/**
 * The argument object for {@link AliasApi.buyTopLevelDomain}
 *
 * @param tld The name of the Top Level Domain (max. 40 chars only digits and letters)
 * @param amountPlanck The amount in planck according SIP-48
*
* @category args
*/
export interface BuyTopLevelDomainArgs extends DefaultSendArgs {
    tld: string;
    amountPlanck: string;
}

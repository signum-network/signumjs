import {DefaultSendArgs} from './defaultSendArgs';


/**
 * The argument object for {@link AccountApi.setAccountInfo}
 *
*
* @category args
*/
export interface SetAccountInfoArgs extends DefaultSendArgs {
    /**
     * The accounts name
     */
    name: string;
    /**
     * The accounts description
     */
    description: string;
}

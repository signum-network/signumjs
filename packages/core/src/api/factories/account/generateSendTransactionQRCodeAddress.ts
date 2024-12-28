/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';

/**
 * Use with {@link ApiComposer} and belongs to {@link AccountApi}.
 *
 * See details at {@link AccountApi.generateSendTransactionQRCodeAddress}
 *
*
* @category factories
*/
export const generateSendTransactionQRCodeAddress = (service: ChainService):
    (
        receiverId: string,
        amountNQT?: number,
        feeSuggestionType?: string,
        feeNQT?: number,
        immutable?: boolean
    ) => Promise<string> =>
    (
        receiverId: string,
        amountNQT: number = 0,
        feeSuggestionType: string = 'standard',
        feeNQT: number = undefined,
        immutable: boolean = undefined
    ): Promise<string> =>
        Promise.resolve(
            service.toApiEndpoint('generateSendTransactionQRCode', {
                    receiverId: receiverId,
                    amountNQT,
                    feeSuggestionType,
                    feeNQT,
                    immutable
                }
            )
        );

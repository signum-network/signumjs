/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';

/**
 * Use with {@link ApiComposer} and belongs to {@link AccountApi}.
 *
 * See details at {@link AccountApi.generateSendTransactionQRCode}
 *
*
* @category factories
*/
export const generateSendTransactionQRCode = (service: ChainService):
    (
        receiverId: string,
        amountNQT?: number,
        feeSuggestionType?: string,
        feeNQT?: number,
        immutable?: boolean
    ) => Promise<ArrayBufferLike> =>
    (
        receiverId: string,
        amountNQT: number = 0,
        feeSuggestionType: string = 'standard',
        feeNQT: number = undefined,
        immutable: boolean = undefined
    ): Promise<ArrayBufferLike> =>
        service.query('generateSendTransactionQRCode', {
            receiverId,
            amountNQT,
            feeSuggestionType,
            feeNQT,
            immutable
        });

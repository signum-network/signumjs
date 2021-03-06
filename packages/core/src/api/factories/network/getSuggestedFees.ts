/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {SuggestedFees} from '../../../typings/suggestedFees';
import {FeeQuantPlanck} from '@signumjs/util';

/**
 * Use with [[ApiComposer]] and belongs to [[NetworkApi]].
 *
 * See details at [[NetworkApi.getSuggestedFees]]
 * @module core.api.factories
 */
export const getSuggestedFees = (service: ChainService): () => Promise<SuggestedFees> => {
    return async (): Promise<SuggestedFees> => {
        const suggestedFees: SuggestedFees = await service.query('suggestFee');
        return {
            ...suggestedFees,
            minimum: FeeQuantPlanck
        };
    };
};

/**
 * Copyright (c) 2020 Burst Apps Team
 * Modified (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {TransferAssetArgs} from '../../../typings/args/transferAssetArgs';
import {transferAsset} from './transferAsset';

/**
 *
 * Use with [[ApiComposer]] and belongs to [[AssetApi]].
 *
 * See details at [[AssetApi.burnAsset]]
 * @module core.api.factories
 *
 */
export const burnAsset = (service: ChainService) =>
    (args: Omit<TransferAssetArgs, 'recipientPublicKey' | 'recipientId'>) => transferAsset(service)({
        ...args,
        recipientId: '0',
        recipientPublicKey: undefined
    });

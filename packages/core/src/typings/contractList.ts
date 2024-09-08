import {Indexable} from './indexable';
import { Contract } from '@signumjs/contracts';

/**
 * Copyright (c) 2019 Burst Apps Team
 */

/**
 * The Contract Id List
 * @category entities
 */
export interface ContractList extends Indexable {
    ats: Contract[];
    requestProcessingTime: number;
}

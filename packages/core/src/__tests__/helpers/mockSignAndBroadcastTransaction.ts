// Import the function to be mocked
import {vi, Mock} from "vitest"

import {signAndBroadcastTransaction} from "../../api/factories/transaction/signAndBroadcastTransaction"
vi.mock('../../api/factories/transaction/signAndBroadcastTransaction', () => {
    return {
        signAndBroadcastTransaction: vi.fn().mockImplementation(() =>
            () => Promise.resolve({ transaction: 'transactionId' })
        ),
    };
});
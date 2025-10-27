// Test: Read-only client (should NOT bundle crypto)
import {createReadOnlyClient} from './src/ledgerClient/createReadOnlyClient';

const client = createReadOnlyClient({nodeHost: 'https://europe.signum.network'});
console.log(client);

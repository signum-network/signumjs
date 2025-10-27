// Test: Standard client (should bundle crypto/sign, NO Pako)
import {createClient} from './src/ledgerClient/createClient';

const client = createClient({nodeHost: 'https://europe.signum.network'});
console.log(client);

// Test: Full client (should bundle crypto/sign AND Pako)
import {createClientWithEncryptedMessaging} from './src/ledgerClient/createClientWithEncryptedMessaging';

const client = createClientWithEncryptedMessaging({nodeHost: 'https://europe.signum.network'});
console.log(client);

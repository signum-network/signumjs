import {Crypto} from './src';
import {NodeJSCryptoAdapter} from './src/adapters';

Crypto.init(new NodeJSCryptoAdapter())

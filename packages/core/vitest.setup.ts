import {Crypto} from '@signumjs/crypto';
import {NodeJSCryptoAdapter} from "@signumjs/crypto/adapters"
Crypto.init(new NodeJSCryptoAdapter())

import {Crypto} from '@signumjs/crypto';
import {NodeJSCryptoAdapter} from "@signumjs/crypto/out/adapters"
Crypto.init(new NodeJSCryptoAdapter())

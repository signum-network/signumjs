import {Crypto} from '@signumjs/crypto';
// @ts-ignore
import {NodeJSCryptoAdapter} from "@signumjs/crypto/adapters"
Crypto.init(new NodeJSCryptoAdapter())

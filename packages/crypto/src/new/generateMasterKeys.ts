import { Keys } from '../typings/keys';
import { ECKCDSA } from '../ec-kcdsa';
import {sha256Raw} from './sha256';
import {Buffer} from './crypto';

/**
 * Generate the Master Public Key and Master Private Keys for a new passphrase
 * @param passPhrase The passphrase
 * @return EC-KCDSA sign key pair + agreement key
 * @module crypto
 */
export async function generateMasterKeys(passPhrase: string): Promise<Keys> {
    const hashedPassPhrase = await sha256Raw(passPhrase);
    const keys = ECKCDSA.keygen(hashedPassPhrase);
    return {
        publicKey: Buffer.from(keys.p).toString('hex'),
        signPrivateKey: Buffer.from(keys.s).toString('hex'),
        agreementPrivateKey: Buffer.from(keys.k).toString('hex')
    };
}

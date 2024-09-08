import {EncoderFormat} from '../encoderFormat';

/**
 * The argument object for {@link createDeeplink}
 *
 * @param {string?} domain The domain used in the protocol
 * @param {string?} action The actions name
 * @param {any?} payload The payload for the action. The payload will be encoded according the _encoderFormat_ parameter
 * @param {EncoderFormat?} encoderFormat The selected format for the payload encoding
 *
 * 
 */
export interface CreateDeeplinkArgs {
    domain?: string;
    action?: string;
    payload?: any;
    encoderFormat?: EncoderFormat;
}

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 * Modified work Copyright (c) 2021 Signum Network
 * Modified work Copyright (c) 2024 Signum Network
 */

import {convertStringToBase64String, convertStringToHexString} from '@signumjs/util';
import { EncoderFormat } from './encoderFormat';
import {CreateDeeplinkArgs} from "./args/createDeeplinkArgs"


/**
 * @internal
 */
function encodePayload(payload: any, encoderFormat: EncoderFormat): string {

    let data = payload;
    if (typeof payload !== 'string') {
        data = JSON.stringify(payload);
    }

    switch (encoderFormat) {
        case EncoderFormat.Hexadecimal:
            return convertStringToHexString(data);
        case EncoderFormat.Base64:
            return convertStringToBase64String(data);
        case EncoderFormat.Text:
        default:
            // noop
            return data;
    }
}

/**
 * Creates a deeplink according the [SIP22 spec](https://github.com/signum-network/SIPs/blob/master/SIP/sip-22.md)
 *
 * `signum.[domain]://v1?action=[action]&payload=[encodedData]`
 *
 * Deeplinks are a way to call/open applications and do certain actions within it, e.g. Phoenix wallet
 * can redirect to the "Send Burst" screen a fill out the form according the passed payload.
 *
 * @see {@link parseDeeplink} as inverse function
 *
 * @param {CreateDeeplinkArgs} args The arguments for the deeplink
 * @return The Deeplink
 *
 * 
 */
export const createDeeplink = (args: CreateDeeplinkArgs): string => {

    const {encoderFormat = EncoderFormat.Base64, domain, action, payload} = args;

    let link = domain ? `signum.${domain}://v1` : `signum://v1`;

    if (action) {
        link += `?action=${action}`;
    }

    if (payload) {
        link += `&payload=${encodePayload(payload, encoderFormat)}`;
    }

    return link;
};

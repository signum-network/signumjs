/**
 * Original work Copyright (c) 2022 Signum Network
 */

import {ExtensionAdapter} from './extensionAdapter';
import {isNodeJS} from '../isNodeJS';
import {BrowserExtensionAdapter} from './browserExtensionAdapter';
import {ConsoleExtensionAdapter} from './consoleExtensionAdapter';

/**
 * Factory to select the correct extension adapter for the used environment
 *
 * To inject this in [[GenericExtensionWallet]]
 *
 * @module wallets
 */
export class ExtensionAdapterFactory {
    public static getAdapter(): ExtensionAdapter {
        return isNodeJS()
            ? new ConsoleExtensionAdapter()
            : new BrowserExtensionAdapter();
    }
}

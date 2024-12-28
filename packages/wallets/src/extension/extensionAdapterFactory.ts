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
 * > The factory is used by the {@link GenericExtensionWallet} - usually, you don't need to use this factory
 *
 * @module wallets
 */
export class ExtensionAdapterFactory {
    /**
     * @return The adapter according to your environment,
     * i.e. {@link BrowserExtensionAdapter} for browser and {@link ConsoleExtensionAdapter} for NodeJS
     */
    public static getAdapter(): ExtensionAdapter {
        return isNodeJS()
            ? new ConsoleExtensionAdapter()
            : new BrowserExtensionAdapter();
    }
}

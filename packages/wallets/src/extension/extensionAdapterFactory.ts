import {ExtensionAdapter} from './extensionAdapter';
import {isNodeJS} from '../isNodeJS';
import {BrowserExtensionAdapter} from './browserExtensionAdapter';
import {ConsoleExtensionAdapter} from './consoleExtensionAdapter';

export class ExtensionAdapterFactory {
    public static createBrowserAdapter(): ExtensionAdapter {
        if (isNodeJS()) {
            throw Error('You cannot use the browser client in the console');
        }
        return new BrowserExtensionAdapter();
    }

    public static createConsoleAdapter(): ExtensionAdapter {
        if (!isNodeJS()) {
            throw Error('You cannot use the console client in the browser');
        }
        return new ConsoleExtensionAdapter();
    }
}

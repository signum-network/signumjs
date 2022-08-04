import {ExtensionDAppMetadata} from '../messaging';

/**
 * Argument object of ExtensionAdapter.requestPermission
 * @internal
 */
export interface RequestPermissionArgs {
    /**
     * Just some additional meta data of the app
     */
    appMeta: ExtensionDAppMetadata;
    /**
     * The network on which the DApp operates
     */
    network: string;
}

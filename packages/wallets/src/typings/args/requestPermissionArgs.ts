import {ExtensionDAppMetadata} from '../messaging';

export interface RequestPermissionArgs {
    appMeta: ExtensionDAppMetadata;
    network: string;
    force: boolean;
}

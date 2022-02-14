import {ExtensionDAppMetadata, ExtensionNetwork} from '../messaging';

export interface RequestPermissionArgs {
    appMeta: ExtensionDAppMetadata;
    network: string;
    force: boolean;
}

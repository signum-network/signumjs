import {ExtensionDAppMetadata, ExtensionNetwork} from '../messaging';

export interface RequestPermissionArgs {
    appMeta: ExtensionDAppMetadata;
    network?: ExtensionNetwork;
    force: boolean;
}

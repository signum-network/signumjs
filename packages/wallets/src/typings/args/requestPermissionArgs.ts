import {ExtensionDAppMetadata} from '../messaging';

export interface RequestPermissionArgs {
    appMeta: ExtensionDAppMetadata;
    force: boolean;
}

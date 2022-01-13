import {ExtensionDAppMetadata} from '../typings/messaging';

export interface RequestPermissionArgs {
    appMeta: ExtensionDAppMetadata;
    force: boolean;
}

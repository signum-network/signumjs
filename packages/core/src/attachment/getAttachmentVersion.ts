import {Transaction} from '../typings/transaction';
import {AttachmentVersionIdentifier} from '../typings/attachmentVersionIdentifier';

/**
 * Gets the attachment version
 * @param transaction The transaction to be checked
 * @param versionIdentifier The versionIdentifier string, i.e. MultiOutCreation
 * @return 0 if not existent, or version number
 *
 */
export function getAttachmentVersion(transaction: Transaction, versionIdentifier: AttachmentVersionIdentifier): number {
    return transaction?.attachment?.[`version.${versionIdentifier}`] ?? 0;
}

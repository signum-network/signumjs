/**
 * Message API
 * Messaging operations - tree-shakeable
 *
 * Usage:
 * - import {sendMessage} from '@signumjs/core/api/message';           // No Pako
 * - import {sendEncryptedMessage} from '@signumjs/core/api/message';  // With Pako
 *
 * @module api/message
 */

export {
    sendMessage,           // Plain messaging (no Pako dependency)
    sendEncryptedMessage,  // Encrypted messaging (pulls in Pako ~133 KB)
} from './message';

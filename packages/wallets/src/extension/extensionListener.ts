/**
 * Original work Copyright (c) 2022 Signum Network
 */

/**
 * Interface for running subscriptions, i.e. returned by {@link WalletConnection.listen}
 */
export interface ExtensionListener {
    /**
     * Unsubscribe from the internal event messaging
     */
    unlisten: () => void;
}

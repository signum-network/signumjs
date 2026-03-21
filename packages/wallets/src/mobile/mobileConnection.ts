/**
 * Original work Copyright (c) 2026 Signum Network
 */

import {ConnectCallbackData} from './mobileWallet';

const StorageKeyPrefix = 'signum:mobile:';
const PublicKeyKey = `${StorageKeyPrefix}publicKey`;

/**
 * A storage interface for persisting mobile wallet connection data.
 * Supports both synchronous and asynchronous implementations.
 * Defaults to `localStorage` in browser environments.
 *
 * Implement this interface to provide custom storage
 * (e.g. sessionStorage, React Native AsyncStorage, IndexedDB, etc.)
 */
export interface MobileConnectionStorage {
    getItem(key: string): string | null | Promise<string | null>;
    setItem(key: string, value: string): void | Promise<void>;
    removeItem(key: string): void | Promise<void>;
}

/**
 * Manages persistence of the mobile wallet connection across page navigations.
 *
 * Since mobile wallet interaction happens via deep links with redirects,
 * the wallet instance doesn't survive page transitions. This class provides
 * a simple API to persist and retrieve the public key returned from the
 * connect callback.
 *
 * All methods return Promises, so both sync and async storage backends
 * are supported transparently.
 *
 * @example
 * ```typescript
 * // On the callback page after connect:
 * const data = MobileWallet.parseConnectCallback();
 * await MobileConnection.save(data);
 *
 * // Later, anywhere in the app:
 * if (await MobileConnection.isConnected()) {
 *   const publicKey = await MobileConnection.getPublicKey();
 *   // use publicKey for transactions...
 * }
 *
 * // To disconnect:
 * await MobileConnection.disconnect();
 * ```
 *
 * @example
 * ```typescript
 * // Using custom async storage (e.g. for React Native):
 * MobileConnection.useStorage(AsyncStorage);
 * await MobileConnection.save(data);
 * ```
 */
export class MobileConnection {
    private static storage: MobileConnectionStorage | null = null;

    private static getStorage(): MobileConnectionStorage {
        if (MobileConnection.storage) {
            return MobileConnection.storage;
        }
        if (typeof localStorage !== 'undefined') {
            return localStorage;
        }
        throw new Error('No storage available. Call MobileConnection.useStorage() to provide a storage implementation.');
    }

    /**
     * Sets a custom storage backend. If not called, defaults to `localStorage`.
     *
     * @param storage - An object implementing `getItem`, `setItem`, and `removeItem`.
     *                  Methods may return values directly or as Promises.
     */
    static useStorage(storage: MobileConnectionStorage): void {
        MobileConnection.storage = storage;
    }

    /**
     * Persists the connection data returned from {@link MobileWallet.parseConnectCallback}.
     *
     * @param data - The callback data containing the public key
     */
    static async save(data: ConnectCallbackData): Promise<void> {
        await MobileConnection.getStorage().setItem(PublicKeyKey, data.publicKey);
    }

    /**
     * Returns `true` if a public key is stored.
     */
    static async isConnected(): Promise<boolean> {
        const value = await MobileConnection.getStorage().getItem(PublicKeyKey);
        return value !== null;
    }

    /**
     * Returns the stored public key, or `null` if not connected.
     */
    static async getPublicKey(): Promise<string | null> {
        return MobileConnection.getStorage().getItem(PublicKeyKey);
    }

    /**
     * Clears the stored connection data.
     */
    static async disconnect(): Promise<void> {
        await MobileConnection.getStorage().removeItem(PublicKeyKey);
    }
}

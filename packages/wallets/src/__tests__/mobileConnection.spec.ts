import {describe, it, expect, beforeEach} from "vitest"
import {MobileConnection, MobileConnectionStorage} from '../mobile';

function createMockStorage(): MobileConnectionStorage & { store: Record<string, string> } {
    const store: Record<string, string> = {};
    return {
        store,
        getItem(key: string) {
            return store[key] ?? null;
        },
        setItem(key: string, value: string) {
            store[key] = value;
        },
        removeItem(key: string) {
            delete store[key];
        }
    };
}

function createAsyncMockStorage(): MobileConnectionStorage & { store: Record<string, string> } {
    const store: Record<string, string> = {};
    return {
        store,
        async getItem(key: string) {
            return store[key] ?? null;
        },
        async setItem(key: string, value: string) {
            store[key] = value;
        },
        async removeItem(key: string) {
            delete store[key];
        }
    };
}

describe('MobileConnection', () => {
    let mockStorage: ReturnType<typeof createMockStorage>;

    beforeEach(async () => {
        mockStorage = createMockStorage();
        MobileConnection.useStorage(mockStorage);
        await MobileConnection.disconnect();
    });

    describe('save', () => {
        it('should persist publicKey from connect callback data', async () => {
            await MobileConnection.save({publicKey: 'abc123', status: 'success'});
            expect(mockStorage.store['signum:mobile:publicKey']).toEqual('abc123');
        });

        it('should overwrite previously stored publicKey', async () => {
            await MobileConnection.save({publicKey: 'first', status: 'success'});
            await MobileConnection.save({publicKey: 'second', status: 'success'});
            expect(await MobileConnection.getPublicKey()).toEqual('second');
        });
    });

    describe('isConnected', () => {
        it('should return false when no publicKey is stored', async () => {
            expect(await MobileConnection.isConnected()).toBe(false);
        });

        it('should return true when publicKey is stored', async () => {
            await MobileConnection.save({publicKey: 'abc123', status: 'success'});
            expect(await MobileConnection.isConnected()).toBe(true);
        });

        it('should return true regardless of status', async () => {
            await MobileConnection.save({publicKey: 'abc123', status: 'rejected'});
            expect(await MobileConnection.isConnected()).toBe(true);
        });
    });

    describe('getPublicKey', () => {
        it('should return null when not connected', async () => {
            expect(await MobileConnection.getPublicKey()).toBeNull();
        });

        it('should return the stored publicKey', async () => {
            await MobileConnection.save({publicKey: 'abc123', status: 'success'});
            expect(await MobileConnection.getPublicKey()).toEqual('abc123');
        });
    });

    describe('disconnect', () => {
        it('should clear the stored publicKey', async () => {
            await MobileConnection.save({publicKey: 'abc123', status: 'success'});
            await MobileConnection.disconnect();
            expect(await MobileConnection.isConnected()).toBe(false);
            expect(await MobileConnection.getPublicKey()).toBeNull();
        });
    });

    describe('useStorage', () => {
        it('should use custom storage implementation', async () => {
            const customStorage = createMockStorage();
            MobileConnection.useStorage(customStorage);
            await MobileConnection.save({publicKey: 'custom123', status: 'success'});
            expect(customStorage.store['signum:mobile:publicKey']).toEqual('custom123');
        });

        it('should work with async storage implementation', async () => {
            const asyncStorage = createAsyncMockStorage();
            MobileConnection.useStorage(asyncStorage);
            await MobileConnection.save({publicKey: 'async123', status: 'success'});
            expect(await MobileConnection.isConnected()).toBe(true);
            expect(await MobileConnection.getPublicKey()).toEqual('async123');
            await MobileConnection.disconnect();
            expect(await MobileConnection.isConnected()).toBe(false);
        });
    });
});

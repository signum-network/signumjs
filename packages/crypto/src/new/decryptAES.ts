function base64ToUint8Array(base64: string): Uint8Array {
    const binaryString = Buffer.from(base64, 'base64').toString('binary');
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}



async function decryptAES(encryptedBase64 : string, key : string): Promise<string> {
    try {
        // Decode base64 string to Uint8Array
        const encryptedData = Uint8Array.from(atob(encryptedBase64), c => c.charCodeAt(0));

        // Convert the key to ArrayBuffer
        const keyBuffer = new TextEncoder().encode(key);

        // Import the key
        const cryptoKey = await crypto.subtle.importKey(
            'raw',
            keyBuffer,
            'AES-CBC',
            false,
            ['decrypt']
        );

        // Extract IV (assuming the first 16 bytes of the encrypted data are the IV)
        const iv = encryptedData.slice(0, 16);
        const data = encryptedData.slice(16);

        // Decrypt the data
        const decryptedData = await crypto.subtle.decrypt(
            {
                name: 'AES-CBC',
                iv: iv
            },
            cryptoKey,
            data
        );

        // Convert the decrypted data to a UTF-8 string
        const decoder = new TextDecoder();
        return decoder.decode(decryptedData);
    } catch (e) {
        return undefined;
    }
}

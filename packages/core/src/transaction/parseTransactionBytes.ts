import {Transaction} from '../typings/transaction';
import {convertHexEndianess, convertHexStringToByteArray, convertHexStringToDecString, convertHexStringToString} from '@signumjs/util';

/**
 * public static Transaction parseTransaction(byte[] bytes) throws BurstException.ValidationException {
    try {
      ByteBuffer buffer = ByteBuffer.wrap(bytes);
      buffer.order(ByteOrder.LITTLE_ENDIAN);
      byte type = buffer.get();
      byte subtype = buffer.get();
      byte version = (byte) ((subtype & 0xF0) >> 4);
      subtype = (byte) (subtype & 0x0F);
      int timestamp = buffer.getInt();
      short deadline = buffer.getShort();
      byte[] senderPublicKey = new byte[32];
      buffer.get(senderPublicKey);
      long recipientId = buffer.getLong();
      long amountNQT = buffer.getLong();
      long feeNQT = buffer.getLong();
      String referencedTransactionFullHash = null;
      byte[] referencedTransactionFullHashBytes = new byte[32];
      buffer.get(referencedTransactionFullHashBytes);
      if (Convert.emptyToNull(referencedTransactionFullHashBytes) != null) {
        referencedTransactionFullHash = Convert.toHexString(referencedTransactionFullHashBytes);
      }
      byte[] signature = new byte[64];
      buffer.get(signature);
      signature = Convert.emptyToNull(signature);
      int flags = 0;
      int ecBlockHeight = 0;
      long ecBlockId = 0;
      if (version > 0) {
        flags = buffer.getInt();
        ecBlockHeight = buffer.getInt();
        ecBlockId = buffer.getLong();
      }
      TransactionType transactionType = TransactionType.findTransactionType(type, subtype);
      Transaction.Builder builder = new Transaction.Builder(version, senderPublicKey, amountNQT, feeNQT,
                                                                            timestamp, deadline, transactionType.parseAttachment(buffer, version))
          .referencedTransactionFullHash(referencedTransactionFullHash)
          .signature(signature)
          .ecBlockHeight(ecBlockHeight)
          .ecBlockId(ecBlockId);
      if (transactionType.hasRecipient()) {
        builder.recipientId(recipientId);
      }

      transactionType.parseAppendices(builder, flags, version, buffer);

      return builder.build();
    } catch (BurstException.NotValidException|RuntimeException e) {
      if (logger.isDebugEnabled()) {
        logger.debug('Failed to parse transaction bytes: {}', Convert.toHexString(bytes));
      }
      throw e;
    }
  }
 */
const _be = (hex: string) => hex.length > 2 ? convertHexEndianess(hex) : hex;
const hexToNumber = (hex: string): number => parseInt(convertHexStringToDecString(_be(hex)), 10);
const hexToDecStr = (hex: string): string => convertHexStringToDecString(_be(hex));

/**
 *
 *requestType:sendMoney
 recipient:2402520554221019656
 amountNQT:100000000
 publicKey:7210b8941929030324540238450e985899989a7ad0267e0c76f668fde3b1016b
 message:Test Message
 feeNQT:73500000
 deadline:1440
 * {"broadcasted":false,"unsignedTransactionBytes":"00107250880da0057210b8941929030324540238450e985899989a7ad0267e0c76f668fde3b1016b0822eb07b777572100e1f50500000000608561040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000295e0500247826166430d2c5010c00008054657374204d657373616765","transactionJSON":{"type":0,"subtype":0,"timestamp":227037298,"deadline":1440,"senderPublicKey":"7210b8941929030324540238450e985899989a7ad0267e0c76f668fde3b1016b","recipient":"2402520554221019656","recipientRS":"TS-QAJA-QW5Y-SWVP-4RVP4","amountNQT":"100000000","feeNQT":"73500000","attachment":{"version.Message":1,"message":"Test Message","messageIsText":true},"sender":"6502115112683865257","senderRS":"TS-K37B-9V85-FB95-793HN","height":2147483647,"version":1,"ecBlockId":"14254508977007523876","ecBlockHeight":351785},"requestProcessingTime":2}
 *
 */

/**
 * @param
 */
export function parseTransactionBytes(hexString: string): Transaction {
    try {

        const type = hexString.substr(0, 2);
        const version = hexString.substr(2, 1);
        const subType = hexString.substr(3, 1);
        const timestamp = hexString.substr(4, 8);
        const deadline = hexString.substr(12, 4);
        const senderPublicKey = hexString.substr(16, 64);
        const recipientId = hexString.substr(80, 16);
        const amountNQT = hexString.substr(96, 16);
        const feeNQT = hexString.substr(112, 16);
        const referencedTransactionFullHash = hexString.substr(128, 64);
        const signature = hexString.substr(192, 64);
        /* const flags = hexString.substr(256, 8); - not used */
        const ecBlockHeight = hexString.substr(264, 8);
        const ecBlockId = hexString.substr(272, 32);
        /* rest is attachment - not used yet */

        return {
            type: hexToNumber(type),
            subtype: hexToNumber(subType),
            version: hexToNumber(version),
            timestamp: hexToNumber(timestamp),
            deadline: hexToNumber(deadline),
            amountNQT: hexToDecStr(amountNQT),
            feeNQT: hexToDecStr(feeNQT),
            recipient: hexToDecStr(recipientId),
            ecBlockHeight: hexToNumber(ecBlockHeight),
            ecBlockId: hexToDecStr(ecBlockId),
            senderPublicKey,
            signature,
            referencedTransactionFullHash,
        };
    } catch (e) {
        throw new Error('Invalid Transaction Bytes');
    }
}

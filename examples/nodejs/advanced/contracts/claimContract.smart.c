#program name ClaimSigna
#program description This easy contract allows accounts to claim Signa once. Nice for some airdrops. It can be recharged at any time, but the amount to be sent can be set only on initialization
#program activationAmount 0.25

long amountToSendPerAccount;
long message[4];
message[] = "Successfully claimed SIGNA!";
void main(void) {
    long txid;
    while ((txid = getNextTx()) != 0) {
        long sender = getSender(txid);
        if(sender == getCreator()) {
            continue;
        }
        long hasSentAlready = getMapValue(1, sender);
        if(!hasSentAlready){
            setMapValue(1, sender, 1);
            sendAmountAndMessage(amountToSendPerAccount, message, sender);
        }
    }
};

const {askAccount, handleError} = require('../helper');
const {Address} = require("@signumjs/core");

// Our entry point has to be async, as our subsequent calls are.
// This pattern keeps your app running until all async calls are executed
(async () => {
    const {account} = await askAccount();
    // now, we don't know if the account is an numeric Id or an Reed-Solomon address
    // The most convenient way is to use the Address value object class
    try {
        // we use the create method, that tries to guess and convert the input
        // if it cannot convert the input an exception will be thrown
        const address = Address.create(account)
        console.log('Numeric Id:', address.getNumericId())
        // The prefix is not an identifying part of the address, and though interchangeable.
        // By default, 'S' is being used, but we can use whatever we want.
        // Convention is: S for Main Net, and TS for Test Net
        const AddressPrefix = 'FOO'
        console.log('Reed-Solomon Address:', address.getReedSolomonAddress(AddressPrefix))

        // ATTENTION: as it is not possible to derive a public key from Numeric Id or Reed-Solomon Address,
        // the following instruction won't work, i.e. the output stays empty
        console.log('Public Key', address.getPublicKey())
    } catch (e) {
        // invalid input
        handleError(e)
    }
})();

const inquirer = require("inquirer");
const {
    convertHexStringToDecString,
    convertHexEndianess,
    convertStringToHexString
} = require("@signumjs/util");
const {handleError} = require("../../helper");

/**
 * This is an example of how to send a text string argument for a contract method call
 * The crux is that the contract uses BigEnding byte Order, and therefore strings
 * as arguments need to be converted with SignumJS.
 *
 * The strings cannot have more than 4*8 bytes due to the limitation of 4 longs.
 * Usually, it's better to use longs directly instead of text.
 *
 * Note: this is only for the special case you want to send a text __argument__
 * or initialize the data stack with  textual data, i.e. name of a to-be minted token
 *
 */


/**
 * Just a helper function to ask for the account id/address
 */
function askForCallingParameters() {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'text',
                message: 'Please enter short text (max 8 chars) to convert?'
            },
        ])
}

/**
 * Convert method
 *
 * see also here: https://github.com/signum-network/signumjs/issues/26
 */
function convert(text) {
    if (text.length > 8) {
        throw new Error('Text Argument cannot be larger than 8 bytes')
    }

    return convertHexStringToDecString(
        convertHexEndianess(
            convertStringToHexString(text)
        )
    );
}

/**
 * This advanced example shows how to interact with smart contracts, i.e. how to call methods
 */
function convertTextToContractArgument(params) {
    try {
        const {text} = params;
        const converted = convert(text)
        console.info('Converted', converted)
    } catch (e) {
        handleError(e);
    }
}

(async () => {
    const params = await askForCallingParameters();
    convertTextToContractArgument(params);
})();

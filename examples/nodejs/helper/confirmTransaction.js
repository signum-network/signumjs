const inquirer = require("inquirer");

/**
 * This method asks for the users passphrase as confirmation for the transaction
 */
module.exports = async function confirmTransaction(params) {

    console.info("These are your parameters", JSON.stringify(params, null, `\t`))

    const response = await inquirer.prompt([{
        type: 'password',
        name: 'passphrase',
        message: 'Please enter your passphrase and confirm the transaction (Hit Enter to Abort)',
        default: null
    }])

    if(!response.passphrase){
        console.info('Aborted by user')
        process.exit(-1)
        return null
    }

    return response
}

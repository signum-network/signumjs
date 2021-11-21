const inquirer = require('inquirer');

/**
 * Just a helper function to ask for the account id/address
 */
function askAccount() {
    // inquirer is a pretty useful lib for CLI interaction
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'account',
                message: 'What\'s the account id or address?'
            }
        ])
}

module.exports = askAccount;

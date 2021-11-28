const {HttpError} = require("@signumjs/http");
const handleError = e => {
    if (e instanceof HttpError) {
        console.error('Oh oh, something went wrong:',
            e.message,
            e.data || '',
            e.requestUrl || ''
        )
    } else {
        console.error('Oh oh, something went wrong:', e)
    }
};

module.exports = handleError;

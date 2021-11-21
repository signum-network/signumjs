const handleApiError = e => {
	// If the API returns an exception,
	// the return error object is of type HttpError
	console.error('Oh oh, something went wrong:',
		e.message,
		e.data,
		e.requestUrl
	)
};

module.exports = handleApiError;

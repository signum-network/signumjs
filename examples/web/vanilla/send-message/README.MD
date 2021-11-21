#### [Send Message]()

> Level: Basic

With this example application you can send a message to another account

Run the `index.html` in any static file server.

Using [serve](https://www.npmjs.com/package/serve) may be the easiest way:

1. `npm i -g serve`
2. `cd ./web/vanilla/send-message`
3. `serve`
4. Open browser at given url, i.e. `http://localhost:5000`

##### Used methods/classes:
	- core/api.message.sendMessage
	- core/composeApi
	- core/Address
	- crypto/generateMasterKeys
	- util/Amount

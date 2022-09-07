const {randomBytes} = require("crypto");
const {PassPhraseGenerator,} = require("@signumjs/crypto");

const generator = new PassPhraseGenerator()

function generateDefault() {
    // this works throughout all platforms, but we recommend to add additional entropy
    return generator.generatePassPhrase()
}

function generateWithAdditionalEntropy() {
    // now, we use the platform specific random function
    const random = randomBytes(128)
    // and add more entropy to the generator. If possible, this is the preferred way
    return generator.generatePassPhrase(Array.from(random))
}

// Our entry point has to be async, as our subsequent calls are.
// This pattern keeps your app running until all async calls are executed
(async () => {
    for (let i = 1; i < 10; ++i) {

        console.log(i, (await generateDefault()).join(' '))
    }
    console.log('====================WITH ADDITIONAL ENTROPY==============================')
    for (let i = 1; i < 10; ++i) {
        console.log(i, (await generateWithAdditionalEntropy()).join(' '))
    }
})();

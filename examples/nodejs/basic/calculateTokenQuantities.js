const {ChainValue} = require("@signumjs/util");

(()=> {
    // Note, we define the decimals for our Token
    const FooValue = ChainValue.create(4)
    // Atomics and Compounds are what Signa and Plancks are
    // Atomic is the quantity always as integer value, while Compound is the decimal representation
    console.log('One FOO is', FooValue.setCompound(1.0).getAtomic(), 'FOOQNT')
    console.log('One FOOQNT is', FooValue.setAtomic(1).getCompound(), 'FOO')

    // Attention, we need to clone FooValue to avoid an override for the calculations
    console.log('10 FOO + 245,000 FOOQNT =', FooValue.setCompound(10).add(FooValue.clone().setAtomic(245000)).getCompound(), 'FOO')
    console.log('10 FOO + 245,000 FOOQNT =', FooValue.setCompound(10).add(FooValue.clone().setAtomic(245000)).getAtomic(), 'FOOQNT')

    console.log('50,000 FOOQNT * 16 =', FooValue.setAtomic(50_000).multiply(16).getCompound(), 'FOO')
    console.log('2 FOO < 40,000 FOOQNT is ', FooValue.setCompound(2).less(FooValue.clone().setAtomic(40_000)))

    // Mind that multiply, add, subtract and divide mutates the value object.
    const mutatedValue = FooValue.setCompound(1)
    mutatedValue.add(FooValue.clone().setCompound(2.65))
    console.log('Value is', mutatedValue.getCompound())
})()

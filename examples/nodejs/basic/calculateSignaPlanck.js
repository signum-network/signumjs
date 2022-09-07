const {Amount} = require("@signumjs/util");

(()=> {
    console.log('One Signa is', Amount.fromSigna(1.0).getPlanck(), 'Planck')
    console.log('One Planck is', Amount.fromPlanck(1).getSigna(), 'SIGNA')

    console.log('10 SIGNA + 245,000 Planck =', Amount.fromSigna(10).add(Amount.fromPlanck(245000)).getSigna(), 'SIGNA')
    console.log('10 SIGNA + 245,000 Planck =', Amount.fromSigna(10).add(Amount.fromPlanck(245000)).getPlanck(), 'Planck')

    console.log('50,000 Planck * 16 =', Amount.fromPlanck(50_000).multiply(16).getSigna(), 'SIGNA')
    console.log('2 SIGNA < 40,000 Planck is ', Amount.fromSigna(2).less(Amount.fromPlanck(40_000)))

    // Mind that multiply, add, subtract and divide mutates the value object.
    const mutatedValue = Amount.fromSigna(1)
    mutatedValue.add(Amount.fromSigna(2.65))
    console.log('Value is', mutatedValue.getSigna())
})()

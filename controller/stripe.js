const stripe = require('stripe')('sk_test_T0a4kiCJInFB1DjREcCAcg9l00GOHeag5g');
// const stripe = require('stripe')('sk_test_51IXTCgSBer6yUtA8SRL72euCzb8EjTBv9vjqm6Kw3FlR0hvbULZMBMpSglg6bnENDTwbycsW2oU6Xog46JDhAa8S00PW3RxM4p')

exports.postCharge = async (req, res) => {
    try {
        const { amount, source, receipt_email } = req.body

        const charge = await stripe.charges.create({
            amount,
            currency: 'usd',
            source,
            receipt_email
        })

        if (!charge) throw new Error('charge unsuccessful')

        res.status(200).json({
            message: 'charge posted successfully',
            charge
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        })
    }
}
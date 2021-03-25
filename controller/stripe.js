const stripe = require('stripe')('sk_test_T0a4kiCJInFB1DjREcCAcg9l00GOHeag5g');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
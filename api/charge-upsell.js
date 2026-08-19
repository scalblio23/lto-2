// One-click upsell: charges the card saved during the first purchase.
// Verifies the original payment succeeded and only ever charges once.
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const UPSELL_AMOUNT = 39700; // DFY Ad Launch — $397

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  try {
    const { payment_intent } = req.body || {};
    if (!payment_intent || !/^pi_/.test(payment_intent)) {
      return res.status(400).json({ error: 'Missing payment reference' });
    }
    const original = await stripe.paymentIntents.retrieve(payment_intent);
    if (original.status !== 'succeeded' || original.metadata.funnel !== 'booking-funnel') {
      return res.status(400).json({ error: 'Original payment not found' });
    }
    const customer = await stripe.customers.retrieve(original.customer);
    if (customer.metadata && customer.metadata.upsell_charged === 'true') {
      return res.status(200).json({ status: 'already_purchased' });
    }
    try {
      const intent = await stripe.paymentIntents.create({
        amount: UPSELL_AMOUNT,
        currency: 'usd',
        customer: original.customer,
        payment_method: original.payment_method,
        off_session: true,
        confirm: true,
        metadata: { plan: 'ad_launch_upsell', funnel: 'booking-funnel', parent: payment_intent },
      });
      await stripe.customers.update(original.customer, { metadata: { upsell_charged: 'true' } });
      res.status(200).json({ status: intent.status });
    } catch (err) {
      if (err.code === 'authentication_required' && err.raw && err.raw.payment_intent) {
        // Bank demands 3DS — hand the client_secret back so the browser can complete it
        return res.status(200).json({
          status: 'requires_action',
          clientSecret: err.raw.payment_intent.client_secret,
          paymentMethod: err.raw.payment_method ? err.raw.payment_method.id : original.payment_method,
        });
      }
      throw err;
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Charge failed' });
  }
};

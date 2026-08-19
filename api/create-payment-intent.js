// Creates the first-purchase PaymentIntent and saves the card for the
// one-click upsell. Amounts are computed here — never trusted from the client.
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const PRICES = {
  pro: 4800,
  pro_bump: 7500,
  premium: 14900,
  premium_bump: 17600,
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  try {
    const { plan, bump, name, email } = req.body || {};
    const key = `${plan}${bump ? '_bump' : ''}`;
    const amount = PRICES[key];
    if (!amount) return res.status(400).json({ error: 'Unknown plan' });
    if (!email) return res.status(400).json({ error: 'Email required' });

    const customer = await stripe.customers.create({ name: name || undefined, email });
    const intent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      customer: customer.id,
      setup_future_usage: 'off_session',
      automatic_payment_methods: { enabled: true },
      receipt_email: email,
      metadata: { plan: key, funnel: 'booking-funnel' },
    });
    res.status(200).json({ clientSecret: intent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not start checkout' });
  }
};

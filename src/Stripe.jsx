
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'https://js.stripe.com/v3/' // Use HTTPS
);

export default stripePromise;
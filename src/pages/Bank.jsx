import React from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from './Checkout';

const stripePromise = loadStripe(" pk_test_51O7CntKeyWyHBFOeFMiYqkcgdDl7fdQAxnbCeklrVbiyNoIXc0ZJEhqsOMvveY1SOgsTScCOO2DsqZVdqDPpzjIk00XsaOb1Tc"
)
export default function Bank() {
  return (
    <Elements stripe={stripePromise}>
    <Checkout/>
  </Elements>
  )
}

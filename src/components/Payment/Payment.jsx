import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Stripe from './Stripe';
import './payment.css';
import PaymentCard from './PaymentCard'

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe(
    'pk_test_51J3fLkDvBTztdzmKxUMVrAvCre6oktEig63I4WNKeNyOK1HGftr5RcrcCHvTEHj2CkvMDcmAIZHKNCrSMTpRVSTC00rzOzYUXS',
);

export default function Payment() {
    return (
        <div className="Payment">
            <PaymentCard />

        </div>
    );
}

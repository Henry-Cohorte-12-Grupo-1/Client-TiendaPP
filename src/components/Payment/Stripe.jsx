import React, { useState, useEffect } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import "./stripe.css";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [email, setEmail] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const totalPriceState = useSelector((store) => store.totalAmount);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    let totalPrice = totalPriceState * 100;
    if (totalPrice === 0) totalPrice = 14500;

    fetch("http://localhost:3001/api/payment/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mount: totalPrice }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      receipt_email: email,
      payment_method: {
        card: elements.getElement(CardElement),
      },
    })

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      console.log("🚀 ~ file: Stripe.jsx ~ line 73 ~ handleSubmit ~ payload", payload)
    }
  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      {/* Enviar mail luego de la compra */}
      {/* <input className="stripe-input"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
      /> */}
      <CardElement
        id="card-element"
        options={cardStyle}
        onChange={handleChange}
      />
      <button
        className="stripe-button"
        disabled={processing || disabled || succeeded}
        id="submit"
      >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        <a href={`https://dashboard.stripe.com/test/payments`}>
          {" "}
          Stripe dashboard.
        </a>{" "}
        Refresh the page to pay again.
      </p>
    </form>
  );
}

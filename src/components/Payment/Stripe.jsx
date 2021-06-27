import "./stripe.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { url } from "../../api";
import axios from "axios";
import jwtDecode from "jwt-decode";

export default function CheckoutForm() {
  const token = localStorage.token ? jwtDecode(localStorage.token) : false;
  const userId = token ? token.id : "guest";

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  //const [email, setEmail] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const totalPriceState = useSelector((store) => store.totalAmount);
  const cart = useSelector((store) => store.cart);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    let totalPrice = totalPriceState * 100;
    if (totalPrice === 0) totalPrice = 14500;

    const request = async () => {
      const res = await axios.post(`${url}/payment/stripe`, {
        mount: totalPrice,
      });
      setClientSecret(res.data.clientSecret);
    };
    request();
  }, []); //eslint-disable-line

  const toSend = { userId, items: cart };

  console.log("LE LLEGA A STRIPE -->", toSend);

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
      //receipt_email: email,
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);

      //ACA LE PEGA A LA API
      await axios.post(`${url}/payment/post-pay`, toSend);
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
        Payment succeeded.
      </p>
    </form>
  );
}

import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { destroyCookie } from "nookies";

const CheckoutForm = ({ paymentIntent }) => {
  
  //bunch of variables for maintaining state, data and styles
  const stripe = useStripe();
  const elements = useElements();
  const [metadata, setMetadata] = useState(null);
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);

  const btn = {
    fontSize: '14px',
    color: 'blue'
  }  

  const handleSubmit = async e => {
    e.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmCardPayment(paymentIntent.client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Eytan Seidman',
        },
      }
    });

    if (result.error) {
      //payment failed - captue data to display to user
      setError(`Payment failed: ${result.error.message}`);
      setProcessing(false);
      console.log("[error]", result.error);
    } else {
      // The payment has been processed!
      destroyCookie(null, "paymentIntentId");
      setError(null);
      setSucceeded(true);
      setProcessing(false);
      setMetadata(result.paymentIntent);
      // There's a risk of the customer closing the window before callback
      // execution. Set up a webhook or plugin to listen for the
      // payment_intent.succeeded event that handles any business critical
      // post-payment actions.
      }
    }

  if (succeeded) 
    return (
      <div>
        <h4>Your payment succeeded! Thank you for your order</h4>
        <p>View PaymentIntent response:</p>
        <code>{JSON.stringify(metadata,null,2)}</code>
      </div>
    );


  return (
    <form onSubmit={handleSubmit}>
      <h4> Welcome Back! Please purchase your refill for $10.99!</h4>
      
      <div><CardElement /></div>

      <button style={btn} type="submit" disabled={processing || !stripe}>
        {processing ? "Processing..." : "Confirm Order"}
      </button>
      
      <div />
      
      {error && <span style={{ color: "red" }}>{error}</span>}

    </form>
  );
};

export default CheckoutForm;
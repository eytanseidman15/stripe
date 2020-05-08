import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { destroyCookie } from "nookies";

const CheckoutForm = ({ paymentIntent }) => {
  
  //bunch of variables for maintaining state, data, customer information and styles
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [email, setEmail] = useState('');
  const [metadata, setMetadata] = useState(null);
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmCardPayment(paymentIntent.client_secret, {
      receipt_email: email,
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: name,
          address: {
            line1: address,
            city: city,
            state: state,
            postal_code: zip
          }
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
      
      }
    }

  if (succeeded) 
    return (
      <div>
        <h4>Your payment succeeded! Thank you for your order!
        Please refresh your browswer if you would like to place another order</h4>
        Your mask should arrive within 3 to 5 days. 
      </div>
    );


  return (
    <form style={{"maxWidth": "600px"}} onSubmit={handleSubmit}>
      <h1>Mask Depot</h1> 
      A mask can help slow the spread of Covid-19 so we all benefit!  
      We are selling high quality, designer, re-usable masks for just $10 each!
      
      <h4>Please enter your shipping and billing information </h4>
      <p>
      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Andrew Cuomo"
      />
      </p>

      <label>Address</label>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="138 Eagle Street"
      />

      <p>
      <label>City</label>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Albany"
      />
      </p>

       <p>
      <label>State</label>
      <input
        type="text"
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder="NY"
      />
      </p>

       <p>
      <label>Zip Code</label>
      <input
        type="text"
        value={zip}
        onChange={(e) => setZip(e.target.value)}
        placeholder="12202"
      />
      </p>

       <p>
      <label>Email Address</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
      />
      </p>

      <h4>Please enter credit card information</h4>
      <div><CardElement /></div>

      <h4>Please press the  complete purhcase button </h4>
      <button type="submit" disabled={processing || !stripe}>
        {processing ? "Processing..." : "Complete Purchase: $10"}
      </button>
      
      <div />
      
      {error && <span style={{ color: "red" }}>{error}</span>}

    </form>
  );
};

export default CheckoutForm;
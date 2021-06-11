import React from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';

import CardSection from './CardSection';
import Cart from '../Cart';

export default function CheckoutForm({ getCustomerDetails, tab }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    let customerDetails = getCustomerDetails()
    console.log(customerDetails)
    if(!customerDetails) return 
    
    const order = {
      items: Cart.getCart(),
      customerDetails,
      delivery: tab == 2 ? true : false
    }

    let response = await fetch('http://localhost:3001/payment/createPayment', {
      method: 'POST',
      mode: "cors",
      credentials: "same-origin",
      body: JSON.stringify(order),
      headers: {
        'Content-type': 'application/json'
      }
    })
    let client_secret = await response.json()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    
    const result = await stripe.confirmCardPayment(client_secret.client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Jenny Rosen',
        },
      }
    });
    console.log("Result: ", result)
    

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log("error: ", result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        console.log("Payment successful")
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  

  let total = (Cart.getPrice()*1.13)
  if(tab == 2) total += 3.49
  return (
    <form onSubmit={handleSubmit} style={{width: "100%", alignContent: "center"}}>
      <CardSection />
      <button className="w-button" style={{background: "black", fontSize: "1.4em", padding: "20px"}} disabled={!stripe}>Checkout {Cart.getSize() > 0 ? "$" + total.toFixed(2) : <></>}</button>
    </form>
  );
}
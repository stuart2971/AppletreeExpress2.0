import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import CardSection from "./CardSection";
import Cart from "../Cart";

export default function CheckoutForm({ getCustomerDetails, tab, setErr }) {
    const stripe = useStripe();
    const elements = useElements();
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        let customerDetails = getCustomerDetails();
        if (!customerDetails) return;

        setButtonDisabled(true);

        const order = {
            items: Cart.getCart(),
            customerDetails,
            delivery: tab == 2 ? true : false,
        };

        let response = await fetch(
            `${process.env.REACT_APP_SERVER_DOMAIN}/payment/createPayment`,
            {
                method: "POST",
                mode: "cors",
                credentials: "same-origin",
                body: JSON.stringify(order),
                headers: {
                    "Content-type": "application/json",
                },
            }
        );
        let client_secret = await response.json();
        if (client_secret.customError) {
            setButtonDisabled(false);
            setErr(client_secret.customError);
            return;
        }

        if (!stripe || !elements) return;

        const result = await stripe.confirmCardPayment(
            client_secret.client_secret,
            {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: "Jenny Rosen",
                    },
                },
            }
        );
        console.log("Result: ", result);

        if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            setButtonDisabled(false);
            setErr(result.error.message);
            console.log("error: ", result.error.message);
        } else {
            // The payment has been processed!
            if (result.paymentIntent.status === "succeeded") {
                console.log("Payment successful");
                redirect("payment_complete");
                // Show a success message to your customer
                // There's a risk of the customer closing the window before callback
                // execution. Set up a webhook or plugin to listen for the
                // payment_intent.succeeded event that handles any business critical
                // post-payment actions.
            }
        }
    };

    const history = useHistory();
    function redirect(url_path) {
        history.push("/" + url_path);
    }
    let total = Cart.getPrice() * 1.13;
    if (tab == 2) total += 3.49;
    let totalString = Cart.getSize() > 0 ? "$" + total.toFixed(2) : "";
    return (
        <form
            onSubmit={handleSubmit}
            style={{ width: "100%", alignContent: "center" }}
        >
            <CardSection />
            <button
                disabled={buttonDisabled || !stripe}
                className="w-button"
                style={
                    buttonDisabled
                        ? {
                              backgroundColor: "grey",
                              fontSize: "1.4em",
                              padding: "20px",
                          }
                        : {
                              backgroundColor: "black",
                              fontSize: "1.4em",
                              padding: "20px",
                          }
                }
            >
                {buttonDisabled ? "Please wait..." : "Checkout " + totalString}{" "}
            </button>
        </form>
    );
}

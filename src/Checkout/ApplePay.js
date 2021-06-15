import { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { PaymentRequestButtonElement, useStripe, useElements } from "@stripe/react-stripe-js";


export default function ApplePay({ order }){
    const stripe = useStripe()
    const elements = useElements()
    const [paymentRequest, setPaymentRequest] = useState(null)

    useEffect(() => {
        if(!stripe || !elements) return

        const pr = stripe.paymentRequest({
            currency: "cad",
            country: "CA",
            requestPayerEmail: true,
            requestPayerName: true,
            total: {
                label: "Items (TESTING): ",
                amount: 90
            }
        })
        
        pr.canMakePayment().then((result) => {
            if(result){
                setPaymentRequest(pr) 
            }
        })
        pr.on("paymentmethod", async (e) => {
            let response = await fetch('https://appletree-express2.herokuapp.com/payment/createPayment', {
                method: 'POST',
                mode: "cors",
                credentials: "same-origin",
                body: JSON.stringify(order),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            let clientSecret = await response.json()

            const {error, paymentIntent} = await stripe.confirmCardPayment(
                clientSecret, {
                    payment_method: e.paymentMethod.id,
                }, {
                    handleActions: false
                }
            )
            if(error) {
                e.complete("fail")
                return
            }

            e.complete("success")
            if(paymentIntent.status == "requires_action") {
                stripe.confirmCardPayment(clientSecret)
            }
        })

    }, [stripe, elements])

    return (
        <>
            {paymentRequest && <PaymentRequestButtonElement options={{paymentRequest}} />}
        </>
    )
}
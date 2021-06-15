import { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { PaymentRequestButtonElement, useStripe, useElements } from "@stripe/react-stripe-js";


export default function ApplePay(){
    const stripe = useStripe()
    const elements = useElements()
    const [paymentRequest, setPaymentRequest] = useState(null)

    useEffect(() => {
        if(!stripe || !elements) return

        const pr = stripe.paymentRequest({
            currency: "cad",
            country: "CA",
            total: {
                label: "Items (TESTING): ",
                amount: 1999
            }
        })
        
        pr.canMakePayment().then((result) => {
            if(result){
                setPaymentRequest(pr) 
            }
        })

    }, [stripe, elements])

    return (
        <>
            {paymentRequest && <PaymentRequestButtonElement options={{paymentRequest}} />}
        </>
    )
}
import { useState } from "react"
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CheckoutForm from "./CheckoutForm"

const stripePromise = loadStripe('pk_live_51IyiI5GIgacFkXbhWEHBHWwYPXUEBAaQh8LedQPdYSOsmv9xFcBm7pB9qZSaO7FfxYtA97mVY62ZPEQ7SkS0hpS500j1f5rNGW', {
    stripeAccount: 'acct_1IyiI5GIgacFkXbh'
});

export default function CheckoutSection({ changeIsDelivery, cartLength }){
    const [tab, setTab] = useState(1)
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [error, setError] = useState("")
    

    function renderTab(){
        if(tab == 1){
            changeIsDelivery(false)
            return <></>
        }
        if(tab == 2){
            changeIsDelivery(true)
            return (
                <div data-w-tab="Tab 2" className="w-tab-pane w--tab-active">
                    <input onChange={e => setAddress(e.target.value)} type="text" className="text-field w-input" maxLength={256} name="name-2" data-name="Name 2" placeholder="Address" id="name-2" required />
                </div>
            )
        }
    }

    function getCustomerDetails(){
        let details = {
            name,
            phone
        }
        if(cartLength == 0){
            setError("You have to add some items to your cart")
            return
        }
        if(!name) {
            setError("Please fill out the name field.")
            return
        }
        if(!phone) {
            setError("Please fill out the phone number field.")
            return
        }
        if(tab == 2){
            if(address) details.address = address
            else {
                setError("Please fill out the address field")
                return
            }
            
        }

        return details
    }

    function setErr(err){
        setError(err)
    }
    return (
        <div className="checkout_container">
            <div className="form-block w-form">
                <form id="email-form" name="email-form" data-name="Email Form">
                    <input onChange={e => setName(e.target.value)} type="text" className="text-field w-input" maxLength={256} name="name" data-name="Name" placeholder="Name" id="name" />
                    <input onChange={e => setPhone(e.target.value)} type="text" className="text-field w-input" maxLength={256} name="name-2" data-name="Name 2" placeholder="Phone Number" id="name-2" required />
                    <div data-duration-in={300} data-duration-out={100} className="tabs w-tabs">
                        <div className="tabs-menu w-tab-menu">
                            <a onClick={() => setTab(1)} data-w-tab="Tab 1" className={(tab == 1 ? "w--current tab-link-tab-1 w-inline-block w-tab-link": "tab-link-tab-1 w-inline-block w-tab-link")}>
                                <div>Pickup</div>
                            </a>
                            <a onClick={() => setTab(2)} data-w-tab="Tab 2" className={(tab == 2 ? "w--current tab-link-tab-1 w-inline-block w-tab-link": "tab-link-tab-1 w-inline-block w-tab-link")}>
                                <div>Delivery</div>
                            </a>
                        </div>
                    <div className="tabs-content w-tab-content">
                        {renderTab()}
                    </div>
                    </div>
                </form>
            </div>
            {error ? <h4>{error}</h4> : <></>}
            <Elements stripe={stripePromise}>
                <CheckoutForm setErr={setErr} tab={tab} getCustomerDetails={getCustomerDetails} />
            </Elements>
            
        </div>
    )
}
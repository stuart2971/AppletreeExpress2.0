import { useState } from "react"
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CheckoutForm from "./CheckoutForm"

const stripePromise = loadStripe("pk_test_51IyiI5GIgacFkXbh3U0O9slOmHqxbtdIHa9TidnHvAt6DSqSg3QezLgkFDTCmcPqMmEPC3w3cHzxdfBxfUyrYrzP00l2DxnCbz");

export default function CheckoutSection(){
    const [tab, setTab] = useState(1)

    function renderTab(){
        if(tab == 1){
            return <></>
        }
        if(tab == 2){
            return (
                <div data-w-tab="Tab 2" className="w-tab-pane w--tab-active">
                    <input type="text" className="text-field w-input" maxLength={256} name="name-2" data-name="Name 2" placeholder="Address" id="name-2" required />
                    <input type="text" className="text-field w-input" maxLength={256} name="name-2" data-name="Name 2" placeholder="Phone Number" id="name-2" required />
                </div>
            )
        }
    }
    console.log(tab)
    return (
        <div className="checkout_container">
            <div className="form-block w-form">
                <form id="email-form" name="email-form" data-name="Email Form"><input type="text" className="text-field w-input" maxLength={256} name="name" data-name="Name" placeholder="Name" id="name" />
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

            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>        
        </div>
    )
}
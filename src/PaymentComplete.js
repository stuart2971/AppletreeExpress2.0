import { useHistory } from "react-router-dom";

import Cart from "./Cart"
import CartItem from "./CartItem"
 

export default function PaymentComplete(){
    let cart = Cart.getCart()

    const history = useHistory();
    function redirect(url_path){
        history.push("/" + url_path);
    }
    return (
    <div className="section">
      <div style={{width: "100vw"}}>
        <div className="w-form" style={{display: "flex", flexDirection: "column", align: "center", alignItems:"center", height: "90vh", justifyContent: "center"}}>
          <h1 style={{linkHeight: "50px", color:"black", fontWeight: "bold", textAlign: "center"}}>Thank you for your purchase</h1>
          <br />
          <input onClick={() => {
              redirect("")
              Cart.clearCart()
            }} type="button" defaultValue="Shop Again" data-wait="Please wait..." className="button w-button" />
          
        </div>
      </div>
      <div style={{display: "flex", flexDirection: "column", alignItems:"center"}}>
        <div className="product_price">Your items</div>
        <div className="payment_complete_cart" >
          {cart.map((item, i) => {
              return <CartItem key={i} item={item} />
          })}
          <CartItem item={{itemName: "Tax", price: Cart.getTax()}} />
          <CartItem item={{itemName: "Total", price: Cart.getPrice() * 1.13}} />
        </div>
      </div>
  </div>
  )
}
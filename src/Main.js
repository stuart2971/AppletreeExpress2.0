import ItemSection from "./ItemSection"
import CartItem from "./CartItem"
import Cart from "./Cart"
import { useState } from 'react';


import logo from "./styles/images/tree.png"

import CheckoutSection from "./Checkout/CheckoutSection"

export default function Main(){
  const [cart, setCart] = useState(Cart.getCart())
  // value is only used to update the state when removeFromCart is called
  const [value, setValue] = useState(0)

  function removeFromCart(itemNumber){
    Cart.removeByItemNumber(itemNumber)
    setValue(value + 1)
  }

  function goToSection(s){
    let section = document.getElementById(s);
    section.scrollIntoView();
  }

  let cartSize = Cart.getSize()
  return (
      <div className="wrapper">
        <div className="main_header">
          <img src={logo} loading="lazy" alt="" className="logo" />
        </div>
        <div className="content_container">
          <div className="items_section_container">
            <div className="items_header">
              <div className="item_header_container">
                <a onClick={() => goToSection("combos")} className="item_headers_text">Combos</a>
                <a onClick={() => goToSection("sandwiches")} href="#" className="item_headers_text">Sandwiches</a>
                <a onClick={() => goToSection("fries")} href="#" className="item_headers_text">Fries</a>
                <a onClick={() => goToSection("others")} href="#" className="item_headers_text">Other</a>
              </div>
            </div>
            <div className="items_content_container">
              
              <ItemSection section="combo" />
              <ItemSection section="sandwich" />
              <ItemSection section="fries" />
              <ItemSection section="other" />
              
            </div>
          </div>
          <div className="cart_container">
            <div className="div-block-3">
              <div className="cart_header">Cart</div>
              <div className="cart_items_container">

              {cartSize == 0 ? <p style={{marginTop: "15px", textAlign: "center"}}>Nothing in your cart yet :/ <br /> Click an item to add one!</p> : cart.map((item, i) => {
                console.log(item)
                return <CartItem removeFromCart={removeFromCart} key={i} item={item} />
              })}

              </div>
            </div>
            <CheckoutSection />
          </div>

        </div>
      </div>
    )
}
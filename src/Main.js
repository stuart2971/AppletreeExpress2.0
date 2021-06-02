import ItemSection from "./ItemSection"
import CartItem from "./CartItem"
import Cart from "./Cart"
import { useState } from 'react';

import logo from "./styles/images/tree.png"

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
              
              <ItemSection section="combos" />
              <ItemSection section="sandwiches" />
              <ItemSection section="fries" />
              <ItemSection section="others" />
              
            </div>
          </div>
          <div className="cart_container">
            <div className="cart_header">Cart</div>
            <div className="cart_items_container">
              {cartSize == 0 ? <p style={{marginTop: "15px", textAlign: "center"}}>Nothing in your cart yet :/ <br /> Click an item to add one!</p> : cart.map((item, i) => {
                console.log(item)
                return <CartItem removeFromCart={removeFromCart} key={i} item={item} />
              })}
              {cartSize > 0 ? 
              <div className="cart_item">
                <div className="cart_item_text_container">
                    <div className="cart_item_name">Tax</div>
                </div>
                <div className="cart_item_price">${Cart.getTax()}</div>
              </div>
              : <div></div>}
            </div>
            <hr />
            <a onClick={() => console.log(Cart.getCart())} href="#" className="button w-button">Checkout {"$"+(Cart.getPrice()*1.13).toFixed(2)}</a>
          </div>
        </div>
      </div>
    )
}
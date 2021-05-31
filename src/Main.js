import ItemSection from "./ItemSection"
import CartItem from "./CartItem"
import Cart from "./Cart"
import { useState } from 'react';


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
  return (
      <div className="wrapper">
        <div className="main_header"><img src="images/tree.png" loading="lazy" alt="" className="logo" /></div>
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
              {Cart.getSize() == 0 ? <p style={{marginTop: "15px", textAlign: "center"}}>Nothing in your cart yet :/ <br /> Click an item to add one!</p> : cart.map((item, i) => {
                console.log(item)
                return <CartItem removeFromCart={removeFromCart} key={i} item={item} />
              })}
            </div>
            <a onClick={() => console.log(Cart.getCart())} href="#" className="button w-button">Checkout</a>
          </div>
        </div>
      </div>
    )
}
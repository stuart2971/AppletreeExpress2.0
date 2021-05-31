import ItemSection from "./ItemSection"
import CartItem from "./CartItem"
import Cart from "./Cart"
import { useState } from 'react';


export default function Main(){
  const [cart, setCart] = useState(Cart.getCart())

  return (
      <div className="wrapper">
        <div className="main_header"><img src="images/tree.png" loading="lazy" alt="" className="logo" /></div>
        <div className="content_container">
          <div className="items_section_container">
            <div className="items_header">
              <div className="item_header_container">
                <a href="#combo_section" className="item_headers_text">Combos</a>
                <a href="#" className="item_headers_text">Sandwiches</a>
                <a href="#" className="item_headers_text">Fries</a>
                <a href="#" className="item_headers_text">Other</a>
              </div>
            </div>
            <div className="items_content_container">

              <ItemSection section="sandwiches" />
              <ItemSection section="fries" />
              <ItemSection section="combos" />
              <ItemSection section="others" />
              
            </div>
          </div>
          <div className="cart_container">
            <div className="cart_header">Cart</div>
            <div className="cart_items_container">
              {Cart.getSize() == 0 ? <p style={{marginTop: "15px"}}>Nothing in your cart yet :/ <br /> Click an item to add one!</p> : cart.map((item, i) => {
                console.log(item)
                return <CartItem key={i} item={item} />
              })}
            </div>
            <a onClick={() => console.log(Cart.getCart())} href="#" className="button w-button">Checkout</a>
          </div>
        </div>
      </div>
    )
}
import ItemSection from "./ItemSection"
import CartItem from "./CartItem"
import Cart from "./Cart"
import { useEffect, useState } from 'react';

import logo from "./styles/images/tree.png"

import CheckoutSection from "./Checkout/CheckoutSection"
import ItemData from "./ItemData";

export default function Main(){
  const [cart, setCart] = useState(Cart.getCart())
  // value is only used to update the state when removeFromCart is called
  const [value, setValue] = useState(0)
  const [isDelivery, setIsDelivery] = useState(false)

  function removeFromCart(itemNumber){
    Cart.removeByItemNumber(itemNumber)
    setValue(value + 1)
  }

  function goToSection(s){
    let section = document.getElementById(s);
    section.scrollIntoView();
  }

  function changeIsDelivery(d){
    setIsDelivery(d)
  }
  useEffect(async () => {
    if(!ItemData.fetchedSections) console.log(await ItemData.fetchSections())
    setValue(value + 1)
  }, []);

  console.log("Rendering")
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
                <a onClick={() => goToSection("combo")} className="item_headers_text">Combos</a>
                <a onClick={() => goToSection("sandwich")} className="item_headers_text">Sandwiches</a>
                <a onClick={() => goToSection("fries")} className="item_headers_text">Fries</a>
                <a onClick={() => goToSection("other")} className="item_headers_text">Other</a>
              </div>
            </div>
            <div className="items_content_container">
              
              <ItemSection sectionName="combo" sectionData={ItemData.comboSection}/>
              <ItemSection sectionName="sandwich" sectionData={ItemData.sandwichSection}/>
              <ItemSection sectionName="fries" sectionData={ItemData.friesSection}/>
              <ItemSection sectionName="other" sectionData={ItemData.otherSection}/>
              
            </div>
          </div>
          <div className="cart_container">
            <div className="div-block-3">
              <div className="cart_header">Cart</div>
              <div className="cart_items_container">

              {cartSize == 0 ? <p style={{marginTop: "15px", textAlign: "center"}}>Nothing in your cart yet :/ <br /> Click an item to add one!</p> : 
              <div>
                {cart.map((item, i) => {
                  return <CartItem removeFromCart={removeFromCart} key={i} item={item} />
                })}
                <CartItem item={{itemName: "Tax", price: parseFloat(Cart.getTax())}} />
                {isDelivery ? <CartItem item={{itemName: "Delivery Fee", price: 3.49}} /> : <></>}
              </div>
              }
              
              </div>
            </div>
            <CheckoutSection changeIsDelivery={changeIsDelivery} cartLength={Cart.getSize()}/>
          </div>

        </div>
      </div>
    )
}
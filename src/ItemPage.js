import { useState } from "react"
import { useHistory } from "react-router-dom";

import TextModule from "./modules/TextModule"
import DropdownModule from "./modules/DropdownModule"
import CheckboxModule from "./modules/CheckboxModule"

import Cart from "./Cart"

import cartImage from "./styles/images/shopping-cart-p-500.png"
import displayImage from "./styles/images/chickenSandwich.jpg"
import backImage from "./styles/images/left-arrow.png"

import ItemData from "./ItemData/ItemData.json"


export default function ItemPage(){
    const history = useHistory();
    const urlParam = history.location.pathname.split("/")[2]
    const item = findItemByUrlPath(urlParam)
    const [data, setData] = useState({ 
      itemType: item.name,
      price: item.price
    })
    function findItemByUrlPath(url_path){
      let sandwiches = ItemData.sandwiches
      let fries = ItemData.fries
      let combos = ItemData.combos
      let others = ItemData.others
      for(let i = 0; i < sandwiches.length; i++){
        if(sandwiches[i].url_path == url_path) return sandwiches[i]
      }
      for(let i = 0; i < fries.length; i++){
        if(fries[i].url_path == url_path) return fries[i]
      }
      for(let i = 0; i < combos.length; i++){
        if(combos[i].url_path == url_path) return combos[i]
      }
      for(let i = 0; i < others.length; i++){
        if(others[i].url_path == url_path) return others[i]
      }
    } 
    function RedirectToItemPage(){
        history.push("/");
    }
    function updateData(key, value){
      setData({...data, [key]: value})
    }
    function renderModules(){
      return item.modules.map((module, i) => {
        if(module.type == "text"){
          return <TextModule key={i} placeHolder={module.placeHolder} objKey={module.objKey} handleOnChange={updateData}/>
        }
        if(module.type == "checkbox"){
          return <CheckboxModule key={i} options={module.options} handleOnChange={updateData}/>
        }
        if(module.type == "dropdown"){
          return <DropdownModule key={i} options={module.options} objKey={module.objKey} handleOnChange={updateData}/>
        }
      })
    }
    function addItemToCart(){
      let modules = item.modules
      for(let i = 0; i < modules.length; i++){
        let isRequired = modules[i].required

        if(isRequired & !data[modules[i].objKey]){
          console.log("Missing field: ", modules[i].objKey)
          return
        }
      }
      Cart.addToCart(data)
      RedirectToItemPage()
    }
    console.log(data)
    return (
        <div className="section">
        <div className="header">
          <a onClick={RedirectToItemPage} className="w-inline-block">
            <img src={backImage} loading="lazy" alt="" className="image" />
          </a>
          <div className="cart_icon_container">
            <img src={cartImage} className="image-2" sizes="(max-width: 1279px) 40px, (max-width: 1439px) 3vw, 40px" />
            <div className="div-block">
              <div className="text-block">{Cart.getSize()}</div>
            </div>
          </div>
        </div>
        <div className="product_container">
          <div className="columns w-row">
            <div className="w-col w-col-6">
              <img src={displayImage} loading="lazy" alt="" /></div>
            <div className="column w-col w-col-6">
              <div className="w-form">
                  <div className="product_name">{item.name}</div>
                  <div className="text-block-2">${item.price.toFixed(2)}</div>
                  
                  {renderModules()}
                  
                  <div className="cart_item_description">{item.note}</div>
                  <br />
                  <input onClick={addItemToCart} type="button" defaultValue="Add to cart" data-wait="Please wait..." className="button w-button" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
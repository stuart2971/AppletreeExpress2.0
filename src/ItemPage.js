import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";

import TextModule from "./InputModules/TextModule"
import DropdownModule from "./InputModules/DropdownModule"
import CheckboxModule from "./InputModules/CheckboxModule"

import Cart from "./Cart"

import cartImage from "./styles/images/shopping-cart-p-500.png"
import backImage from "./styles/images/left-arrow.png"
import errorImage from "./styles/images/error.png"

export default function ItemPage(){
    const history = useHistory();
    const [item, setItem] = useState({})
    const [data, setData] = useState({ 
      itemName: "",
      price: "",
      type: ""
    })
    const [error, setError] = useState("")

    useEffect(async () => {
      const urlParam = history.location.pathname.split("/")[2]
      let item = await (await fetch("http://localhost:3001/item/url/" + urlParam)).json()
      setItem(item)
      setData({
        itemName: item.name,
        price: item.price,
        type: item.type
      })
    }, [])

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
          setError("Please fill in all required fields.  Missing field: " + modules[i].objKey)
          return
        }
      }
      console.log(data)
      // Inserted into cart successfully
      Cart.addToCart(data)
      history.push("/");
    }
    function renderError(){
      if(error){
        return (
          <div className="product_page_error">
            <img src={errorImage} loading="lazy" alt="" className="warning_symbol" />
            <p className="paragraph">{error}</p>
          </div>
        )
      }   
    }

    if(JSON.stringify(item) === JSON.stringify({}))
      return <div>Loading...</div>

    // console.log(data)
      return (
        <div className="section">
        <div className="header">
          <a onClick={() => history.push("/")} className="w-inline-block">
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
              {item.image ? <img src={item.image} loading="lazy" alt="" /> : "Image not available"}
              </div>
            <div className="column w-col w-col-6">
              <div className="w-form">
                  <div className="product_name">{item.name}</div>
                  <div className="product_price">${item.price}</div>
                  
                  {renderModules()}
                  
                  <div className="cart_item_description">{item.note}</div>
                  {renderError()}
                  <br />
                  
                  <input onClick={addItemToCart} type="button" defaultValue="Add to cart" data-wait="Please wait..." className="button w-button" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
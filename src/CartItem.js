import {useState } from "react"
import Cart from "./Cart"



export default function CartItem({ item, removeFromCart }){
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function parseDescription(){
        let description = []
        let veggies = []
        if(item.name) description.push(capitalizeFirstLetter("Belongs to " + item.name))
        if(item.sandwichType) description.push(capitalizeFirstLetter(item.sandwichType + " sandwich"))
        if(item.lettuce) veggies.push("Lettuce")
        if(item.tomato) veggies.push("Tomato")
        if(item.cucumber) veggies.push("Cucumber")
        if(item.onion) veggies.push("Onion")
        if(veggies.length != 0) description.push(capitalizeFirstLetter(veggies.join(", ")))
        if(item.spice) description.push(capitalizeFirstLetter("spice: " + item.spice))
        if(item.cheese) description.push(capitalizeFirstLetter(item.cheese))
        if(item.extraInstructions) description.push(`Extra Instructions (optional): "${item.extraInstructions}"`)
        if(item.mayoType) description.push(capitalizeFirstLetter(item.mayoType + " mayo"))
        if(item.friesType) description.push(capitalizeFirstLetter("Fries Type: " + item.friesType))
        if(item.sideType) description.push(capitalizeFirstLetter("side: " + item.sideType))
        if(item.drink) description.push(capitalizeFirstLetter(item.drink))
        return <div className="cart_item_description">{description.join(" • ")}</div>
    }

    return (
        <div className="cart_item" style={{textAlign: "left"}}>
            <div className="cart_item_text_container">
                <div className="cart_item_name">{item.itemName}</div>
                {removeFromCart ? <div onClick={() => removeFromCart(item.itemNumber)} className="cart_delete">x</div>: <></>}
                
                {parseDescription()}
            </div>
            <div className="cart_item_price">${item.price.toFixed(2)}</div>
        </div>
    )
}
import specialCosts from "./ItemData/specialCosts.json"

export default class Cart{
    static cart = []
    static itemCount = 0

    static addToCart(item){
        // Keeps track of item number so that you can remove the correct item
        item.itemNumber = this.itemCount
        // For extra costs like cheese
        const specialCostsKeys = Object.keys(specialCosts)
        const itemKeys = Object.keys(item) 
        specialCostsKeys.forEach((key) => {
            if(itemKeys.includes(key)){
                if(itemKeys[key]){
                    item.price += specialCosts[key]
                }
            }
        })

        this.cart.push(item)
        this.itemCount++

    }
    static getCart(){
        return this.cart
    }
    static getSize(){
        return this.cart.length
    }
    static removeByItemNumber(itemNumber){
        for(let i = 0; i < this.cart.length; i++){
            if(this.cart[i].itemNumber == itemNumber){
                console.log(this.cart[i])
                this.cart.splice(i, 1)
                return
            }
        }
    }
    static getPrice(){
        let total = 0
        for(let i = 0; i < this.cart.length; i++) total += this.cart[i].price
        return total.toFixed(2)
    }
    static getTax(){
        return (this.getPrice() * 0.13).toFixed(2)
    }
}
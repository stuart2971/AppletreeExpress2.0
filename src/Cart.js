export default class Cart{
    static cart = []
    static itemCount = 0
    static specialCosts = {}

    static setSpecialCosts(specialCosts){
        this.specialCosts = specialCosts
    }
    static addToCart(item){
        if(JSON.stringify(this.specialCosts) === JSON.stringify({})){
            alert("Special costs is not loaded yet") 
            return
        }
        // Keeps track of item number so that you can remove the correct item
        item.itemNumber = this.itemCount
        // For extra costs like cheese
        const specialCostsKeys = Object.keys(this.specialCosts)
        const itemKeys = Object.keys(item) 

        specialCostsKeys.forEach((key) => {
            if(itemKeys.includes(key)){
                if(item[key] != ""){
                    item.price += this.specialCosts[key]
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
                this.cart.splice(i, 1)
                return
            }
        }
    }
    static getPrice(){
        let total = 0
        for(let i = 0; i < this.cart.length; i++) total += this.cart[i].price
        return total
    }
    static getTax(){
        return (this.getPrice() * 0.13)
    }
    static clearCart(){
        this.cart = []
        this.itemCount = 0
    }
}
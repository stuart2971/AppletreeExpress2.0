export default class Cart{
    static cart = []
    static itemCount = 0

    static addToCart(a){
        a.itemNumber = this.itemCount
        this.cart.push(a)
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
}
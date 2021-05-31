export default class Cart{
    static cart = []

    static addToCart(a){
        this.cart.push(a)
    }
    static getCart(){
        return this.cart
    }
    static getSize(){
        return this.cart.length
    }
}
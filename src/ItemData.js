export default class ItemData{
    static fetchedSections = false;
    static comboSection = []
    static sandwichSection = []
    static friesSection = []
    static otherSection = []

    static async fetchSections(){
        try{
            this.comboSection = await (await fetch("https://appletree-express2.herokuapp.com/item/type/combo")).json()
            this.sandwichSection = await (await fetch("https://appletree-express2.herokuapp.com/item/type/sandwich")).json()
            this.friesSection = await (await fetch("https://appletree-express2.herokuapp.com/item/type/fries")).json()
            this.otherSection = await (await fetch("https://appletree-express2.herokuapp.com/item/type/other")).json()
            this.fetchedSections = true
            return "Fetched Sections"
        }catch(err){
            console.log("Error (ItemData.fetchSections()): ", err)
        }
        
    }
}
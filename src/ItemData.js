import Combo1 from "./ItemData/combos/combo_1.json";
import Combo2 from "./ItemData/combos/combo_2.json";
import Combo3 from "./ItemData/combos/combo_3.json";
import FalafelPlate from "./ItemData/combos/falafel_plate.json";

import BeefSandwich from "./ItemData/sandwiches/beef_sandwich.json";
import ChickenSandwich from "./ItemData/sandwiches/chicken_sandwich.json";
import FalafelSandwich from "./ItemData/sandwiches/falafel_sandwich.json";

import RegularFries from "./ItemData/fries/regular_fries.json";
import Poutine from "./ItemData/fries/poutine.json";
import SpicyFries from "./ItemData/fries/spicy_fries.json";
import BelgianFries from "./ItemData/fries/belgian_fries.json";

import SpringRolls from "./ItemData/others/springrolls.json";
import Pop from "./ItemData/others/pop.json";
import Brownie from "./ItemData/others/brownie.json";
import MonsterEnergy from "./ItemData/others/monster_energy.json";

export default class ItemData {
    static fetchedSections = false;
    static comboSection = [Combo1, Combo2, Combo3, FalafelPlate];
    static sandwichSection = [BeefSandwich, ChickenSandwich, FalafelSandwich];
    static friesSection = [RegularFries, Poutine, SpicyFries, BelgianFries];
    static otherSection = [SpringRolls, Pop, Brownie, MonsterEnergy];

    static getItemByUrl(url) {
        for (let i = 0; i < this.comboSection.length; i++) {
            if (this.comboSection[i].url_path === url) {
                return this.comboSection[i];
            }
        }
        for (let i = 0; i < this.sandwichSection.length; i++) {
            if (this.sandwichSection[i].url_path === url) {
                return this.sandwichSection[i];
            }
        }
        for (let i = 0; i < this.friesSection.length; i++) {
            if (this.friesSection[i].url_path === url) {
                return this.friesSection[i];
            }
        }
        for (let i = 0; i < this.otherSection.length; i++) {
            if (this.otherSection[i].url_path === url) {
                return this.otherSection[i];
            }
        }
    }
}

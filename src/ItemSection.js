import { useHistory } from "react-router-dom";

import ItemData from "./ItemData/ItemData.json"


export default function ItemListing({ section }){
    const history = useHistory();

    function RedirectToItemPage(url_path){
        history.push("/item" + url_path);
    }
    return (
        <div id="combo_section" className="section_container">
            <div className="grid_container">
                {
                    ItemData[section].map((item, i) => {
                        return(
                             <div key={i} className="item_container" onClick={() => RedirectToItemPage("/"+item.url_path)}>
                                <div className="item_text_container">
                                    <div className="item_name">{item.name}</div>
                                    <div className="item_description">{item.description}</div>
                                    <div className="item_price">${item.price}</div>
                                </div>
                                <img src="images/spicyFries.jpeg" loading="lazy" alt="" className="item_image" />
                            </div>
                        )
                    })

                }
                

            </div>
        </div>
            
    )
}
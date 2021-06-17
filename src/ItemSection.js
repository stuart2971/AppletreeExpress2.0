import { useHistory } from "react-router-dom";

export default function ItemListing({ sectionName, sectionData }){

    const history = useHistory();
    function RedirectToItemPage(url_path){
        history.push("/item" + url_path);
    }

    if(JSON.stringify(sectionData) === JSON.stringify({}))
        return <div>Loading...</div>

    return (
        <div id={sectionName} className="section_container">
            <div className="grid_container">
                {
                    sectionData.map((item, i) => {
                        return(
                             <div key={i} className="item_container" onClick={() => RedirectToItemPage("/"+item.url_path)}>
                                {item.image ? <img src={item.image} loading="lazy" alt="" className="item_image" /> : <div></div>}
                                
                                <div className="item_text_container">
                                    <div className="item_name">{item.name}</div>
                                    <div className="item_description">{item.description}</div>
                                    <div className="item_price">${item.price.toFixed(2)}</div>
                                </div>
                                
                            </div>
                        )
                    })

                }
                

            </div>
        </div>
            
    )
}
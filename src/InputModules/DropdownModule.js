export default function DropdownModule({ options, objKey, handleOnChange }){
    
    return (
        <select onChange={e => handleOnChange(objKey, e.target.value )} id="field" name="field" required className="dropdown w-select">
            {options.map((option, i) => {
                return <option key={i} value={option.value}>{option.option}</option>
            })}
        </select>
    )
}
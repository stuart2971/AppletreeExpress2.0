

export default function CheckboxModule({ options, handleOnChange }){

    return (
        <div className="checkbox_container">
            {options.map((option, i) => {
                return (
                    <label key={i} onClick={e => handleOnChange(option.objKey, e.target.checked)} className="w-checkbox checkbox-field">
                        <input type="checkbox" id="checkbox" name="checkbox" data-name="Checkbox" className="w-checkbox-input checkbox" />
                        <span className="checkbox-label w-form-label">{option.option}</span>
                    </label>
                )
            })}
    </div>
    )
}
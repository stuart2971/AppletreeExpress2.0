

export default function TextModule({ placeHolder, objKey, handleOnChange }){
    return (
        <input onChange={e => handleOnChange(objKey, e.target.value)} type="text" className="text-field w-input" maxLength={256} name="name" data-name="Name" placeholder={placeHolder} id="name" />
    )
}
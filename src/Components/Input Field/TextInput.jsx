export function TextInput({label, name, value, onChange, type = 'text'}) {

    return (
        <div className={'text-input'}>
            <input type = {type}
            name={name}
            onChange={onChange}
            value={value}
            placeholder={label}>
            </input>
        </div>
    )
}
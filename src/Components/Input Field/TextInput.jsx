export function TextInput({label, value, onChange, type = 'text'}) {

    return (
        <div className={'text-input'}>
            <input type = {type}
            name={label}
            onChange={onChange}
            value={value}
            placeholder={label}>
            </input>
        </div>
    )
}
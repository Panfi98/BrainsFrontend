export function TextInput({label, value, onChange}) {

    return (
        <div className={'text-input'}>
            <input type = 'text'
            name={label}
            onChange={onChange}
            value={value}
            placeholder={label}>
            </input>
        </div>
    )
}
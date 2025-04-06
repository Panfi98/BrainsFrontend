export function TextInput({label, value, onChange}) {

    return (
        <div className={'text-input'}>
            <label>{label}</label>
            <input type = 'text'
            name={label}
            onChange={onChange}
            value={value}>
            </input>
        </div>
    )
}
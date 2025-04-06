export function TextInput({label}) {
    // const [showPassword, setShowPassword] = React.useState(false);
    // const [input, setInput] = React.useState('');

    return (
        <div className={'text-input'}>
            <label>{label}</label>
            <input type = 'text'>

            </input>
        </div>
    )
}
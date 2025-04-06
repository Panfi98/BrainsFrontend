import {TextInput} from "../Input Field/TextInput.jsx";
import {useState} from "react";
import {SubmitButton} from "../Button/SubmitButton.jsx";

export const Login = () => {

    const [formData, setFormDate] = useState({email: "", password: ""});



    return (
        <div className={'login'}>
            <TextInput label={'User'} />
            <TextInput label={'Password'} />
            <SubmitButton />
            <h2>Token</h2>
        </div>
    )
}
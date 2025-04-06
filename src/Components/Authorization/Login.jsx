import {TextInput} from "../Input Field/TextInput.jsx";
import {useState} from "react";
import {SubmitButton} from "../Button/SubmitButton.jsx";

export const Login = () => {

    const [formData, setFormData] = useState({username: "", password: ""});

    const onChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit =  (e) => {
        e.preventDefault();
    }


    return (
        <div className={'login'}>
            <TextInput label={'username'} onChange={onChange} value={formData.username}/>
            <TextInput label={'password'} onChange={onChange} value={formData.password}/>
            <SubmitButton onClick={handleSubmit}/>
            <h2>Token</h2>
            <h2>Values you just have typed:</h2>
            <div>
                <p>Username: {formData.username}</p>
                <p>Password: {formData.password}</p>
            </div>
        </div>
    )
}
import './Login.css';
import {TextInput} from "../Input Field/TextInput.jsx";
import {SubmitButton} from "../Button/SubmitButton.jsx";
import {useAuth} from "../../Context/AuthContext.jsx";

export const Login = () => {
    const {token, authenticate, userData, setUserData} = useAuth()

    const onChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setUserData({...userData, [name]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        authenticate()
    }


    return (
        <div>
            <div className="login-page">
                <div className='login-window'>
                    <TextInput label={'username'} onChange={onChange} value={userData.username}/>
                    <TextInput label={'password'} onChange={onChange} value={userData.password}/>
                    <SubmitButton onClick={handleSubmit}/>
                </div>
            </div>
            <div className='token'>
                <h2>Token</h2>
                <div>
                        {token ?? 'No token yet'}
                </div>
            </div>
        </div>
    )
}
import {TextInput} from "../Input Field/TextInput.jsx";
import {SubmitButton} from "../Button/SubmitButton.jsx";
import {useAuth} from "../../Context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

export const Login = () => {
    const {token, authenticate, userData, setUserData} = useAuth()
    const navigate = useNavigate();

    const onChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setUserData({...userData, [name]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authenticate();
            navigate("/dashboard");
        } catch (error) {
            console.error("Authentication failed:", error);
        }
    }


    return (
        <div className={'login'}>
            <TextInput label={'username'} onChange={onChange} value={userData.username}/>
            <TextInput label={'password'} onChange={onChange} value={userData.password}/>
            <SubmitButton onClick={handleSubmit}/>
            <h2>Token</h2>
            <div>
                {token ?? 'No token yet'}
            </div>
        </div>
    )
}
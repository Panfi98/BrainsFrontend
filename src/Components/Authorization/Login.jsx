import './Login.css';
import {TextInput} from "../Input Field/TextInput.jsx";
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
            console.log("Authentication successfull. Token: ", token)
        } catch (error) {
            console.error("Authentication failed:", error);
        }
    }


    return (
        <div className='login-container'>
            <div className={'login'}>
                <h3>Log in</h3>
                <TextInput label={'username'} onChange={onChange} value={userData.username}/>
                <TextInput label={'password'} onChange={onChange} value={userData.password}/>
                <button onClick={handleSubmit}>Login</button>
                <div className='login-footer'>
                    <p className='register-text'>
                        Don't have an account?  
                        <a href=""> Sign up</a>
                    </p>
                    <a href="" className='forgot-password-text'>Forgot your password?</a>
                </div>
            </div>
        </div>
    )
}
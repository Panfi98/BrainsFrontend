import './Login.css';
import {TextInput} from "../Input Field/TextInput.jsx";
import {useAuth} from "../../Context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";


export const Login = () => {
    const {token, authenticate, userData, setUserData} = useAuth()
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setUserData({...userData, [name]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await authenticate();
            navigate("/dashboard");
            console.log("Authentication successfull. Token: ", token)
        } catch (error) {
            console.error("Authentication failed:", error);
        }
        finally {
            setIsLoading(false);
        }
    }


    return (
        <div className={'login'}>
            <h3>Log in</h3>
            <div className='login-input'>
                <TextInput label={'username'} onChange={onChange} value={userData.username}/>
                <TextInput label={'password'} onChange={onChange} value={userData.password} type="password"/>
            </div>
            <button onClick={handleSubmit}>{isLoading ? "Login..." : "Login" }</button>
            <div className='login-footer'>
                <p className='register-text'>
                    Don't have an account?  
                    <a href="/signup"> Sign up</a>
                </p>
                <a href="" className='forgot-password-text'>Forgot your password?</a>
            </div>
        </div>
    )
}
import './SignUp.css'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TextInput } from "../Input Field/TextInput.jsx";
import { CreateUser } from "../../Fetcher/CreateUser.js";

export function SignUp() {
    const [newUserData, setNewUserData] = useState({
        username: "",
        password: "",
        password2: "",
        email: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onChange = (e) => {
        const { name, value } = e.target;
        setNewUserData({ ...newUserData, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!newUserData.email || !newUserData.username || !newUserData.password || !newUserData.password2) {
            alert('Please fill in all fields');
            return;
        }

        if (newUserData.password !== newUserData.password2) {
            alert('Passwords do not match');
            return;
        }

        setIsLoading(true);
        try {
            const response = await CreateUser(newUserData);
            if (response.ok) {
                navigate('/login');
                console.log('Successfully signed up');
            }
        } catch (error) {
            console.error('Signup error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='signup-container'>
            <div className='signup'>
                <h3>Sign up</h3>
                <form onSubmit={onSubmit}>
                    <TextInput label='email' onChange={onChange} value={newUserData.email} />
                    <TextInput label='username' onChange={onChange} value={newUserData.username} />
                    <TextInput
                        label='password'
                        onChange={onChange}
                        value={newUserData.password}
                        type="password"
                    />
                    <TextInput
                        label='password2'
                        onChange={onChange}
                        value={newUserData.password2}
                        type="password"
                    />
                    <button
                        type="submit"
                        className="signup-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
                <div className='signup-footer'></div>
            </div>
        </div>
    );
}
import './SignUp.css'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TextInput } from "../Input Field/TextInput.jsx";
import { CreateUser } from "../../Fetcher/PostFetcher/CreateUser.js";
import VeryficationEmail from "./VeryficationEmail.jsx";

export function SignUp() {
    const [newUserData, setNewUserData] = useState({
        username: "",
        password: "",
        password2: "",
        email: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const [showVerification, setShowVerification] = useState(false);
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
                const responseData = await response.json();
                setUserId(responseData.id);
                setShowVerification(true);
                console.log('Successfully signed up');
            }
        } catch (error) {
            console.error('Signup error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='signup'>
            <h3>Sign up</h3>
            <div className='signup-input'>
                <TextInput label='email' name='email' onChange={onChange} value={newUserData.email} />
                <TextInput label='username' name='username' onChange={onChange} value={newUserData.username} />
                <TextInput
                    label='password'
                    name = 'password'
                    onChange={onChange}
                    value={newUserData.password}
                    type="password"
                />
                <TextInput
                    label='password2'
                    name = 'password2'
                    onChange={onChange}
                    value={newUserData.password2}
                    type="password"
                />
            </div>
            <button
                onClick={onSubmit}
                className="signup-button"
                disabled={isLoading}
            >
                {isLoading ? 'Signing up...' : 'Sign Up'}
            </button>
            {showVerification ? <VeryficationEmail userId={userId} /> : null}
        </div>
    );
}
import {TextInput} from "../Input Field/TextInput.jsx";
import {useState} from "react";
import {SubmitButton} from "../Button/SubmitButton.jsx";

export const Login = ({setAuthToken, authToken}) => {

    const [formData, setFormData] = useState({username: "", password: ""});




    const onChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // First, authenticate to get a token (adjust URL as needed)
            const loginResponse = await fetch('https://localhost:7106/user/login', {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify
                ({
                    username: formData.username,
                    password: formData.password
                })
            });

            if (!loginResponse.ok) {
                throw new Error('Login failed');
            }

            const data = await loginResponse.json();
            const authToken = data.token;
            setAuthToken(authToken);


            const userResponse = await fetch('https://localhost:7106/user', {
                method: 'GET',
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (!userResponse.ok) {
                throw new Error('Failed to fetch user data');
            }

            const userData = await userResponse.json();
            console.log('User data:', userData);


        } catch (error) {
            console.error('Error:', error);
        }
    }


    return (
        <div className={'login'}>
            <TextInput label={'username'} onChange={onChange} value={formData.username}/>
            <TextInput label={'password'} onChange={onChange} value={formData.password}/>
            <SubmitButton onClick={handleSubmit}/>
            <h2>Token</h2>
            <div>
                {authToken ? authToken : 'No token yet'}
            </div>
            <h2>Values you just have typed:</h2>
            <div>
                <p>Username: {formData.username}</p>
                <p>Password: {formData.password}</p>
            </div>
            <h2>Error: </h2>
        </div>
    )
}
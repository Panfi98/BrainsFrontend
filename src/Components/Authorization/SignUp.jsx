import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {TextInput} from "../Input Field/TextInput.jsx";
import {CreateUser} from "../../Fetcher/CreateUser.js";

export function SignUp() {

    const [newUserData, setNewUserData] = useState({username: "", password: "", password2: "", email: ""});
    const [fetchStatus, setFetchStatus] = useState(false);
    const navigate = useNavigate()

    const onChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target
        setNewUserData({...newUserData, [name]: value})
    }

    const onSubmit = async (e)=>{
        e.preventDefault();
        try{
            if (newUserData.password === newUserData.password2) {
                const response = await CreateUser(newUserData)
                if (response.status === 200) {
                    navigate('/login')
                    console.log('Successfully signed up')
                }
            }
        }
        catch(error){
            console.log(error)
        }
        
    }

    return (
        <div className='signup-container'>
            <div className={'signup'}>
                <h3>Sign up</h3>
                <TextInput label={'email'} onChange={onChange} value={newUserData.email}/>
                <TextInput label={'username'} onChange={onChange} value={newUserData.username}/>
                <TextInput label={'password'} onChange={onChange} value={newUserData.password}/>
                <div className='login-footer'>
                </div>
            </div>
        </div>
    )
}

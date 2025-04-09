import React, {useState, useContext} from "react";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider(props){
    const [userData, setUserData] = useState({username:'',password:''})
    const [isLoggedIn, setIsLoggedIn]=useState(false)
    const [token, setToken] = useState()

    const authenticate = async () => {
        const authResponse = await fetch(import.meta.env.VITE_BRAIN_LOGIN_ENDPOINT, {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: userData.username,
                password: userData.password
            })
        });
        if (!authResponse.ok) {
            throw new Error('Login failed');
        }

        const data = await authResponse.json();
        const authToken = data.token;
        setToken(authToken);
        setIsLoggedIn(true)
    }

    const value = {
        authenticate,
        userData,
        setUserData,
        isLoggedIn,
        setIsLoggedIn,
        token,
        setToken
    }

    return(
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>)
}
import React, {useState, useContext, useEffect} from "react";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

const LOCAL_STORAGE_TOKEN_KEY = 'authToken';
const LOCAL_STORAGE_USER_KEY = 'authUser';


const getStoredUser = () => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    try {
        return storedUser ? JSON.parse(storedUser) : { username: '' };
    } catch (error) {
        console.error("Failed to parse user data from localStorage", error);
        return { username: '' };
    }
};

export function AuthProvider(props){
    const [userData, setUserData] = useState(() => { // <--- Original setUserData from useState
        const user = getStoredUser();
        return { username: user.username || '', password: '' }; // Initialize with stored username, empty password
    });

    const [token, setToken] = useState(() => localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY));
    const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY));


    useEffect(() => {
        if (token) {
            localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
            setIsLoggedIn(true);

            if (userData.username) {
               localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify({ username: userData.username }));
            }
        } else {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
            localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
            setIsLoggedIn(false);
        }
    }, [token, userData.username, isLoggedIn]);

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

            setUserData(prevData => ({ ...prevData, password: '' }));
            throw new Error('Login failed');
        }

        const data = await authResponse.json();
        const authToken = data.token;

        setToken(authToken);
        setUserData(prevData => ({ ...prevData, password: '' }));
    }

    const logout = () => {
        setToken(null);
        setUserData({username:'', password:''});
    }


    const value = {
        authenticate,
        logout,
        userData,
        setUserData,
        isLoggedIn,
        token,
    }

    return(
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>)
}
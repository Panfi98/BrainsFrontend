import React from "react";
import {useAuth} from "../Context/AuthContext.jsx";

const Dashboard = () => {
    const {authUser, setAuthUser, isLoggedIn, setIsLoggedIn} = useAuth();


    return (
        <div>
            <button>login</button>
            <button>logout</button>
        </div>
    )
}

export default Dashboard;
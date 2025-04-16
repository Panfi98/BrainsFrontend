import React from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import './Profile.css';

const Profile = () => {
    const { isLoggedIn, userData, setIsLoggedIn, setToken } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="profile-page">
            <div className="profile-header">
                <p>Welkome</p>
            </div>
            <div className="profile-content">
                <p>Pupupu</p>
            </div>
            <div className="profile-footer">
                <p>© 2025 Worker App. All rights reserved</p>
            </div>
        </div>
    );
}

export default Profile;
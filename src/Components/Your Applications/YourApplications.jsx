import React from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import '../../App.jsx';
import './YourApplications.css';
import ProfileMenu from "../ProfilePage/ProfileMenu/ProfileMenu.jsx";
import { HiOutlinePlusSmall } from "react-icons/hi2";


const YourApplications = () => {
    const { isLoggedIn, userData, setIsLoggedIn, setToken } = useAuth();
    const navigate = useNavigate();


    return (
        <div className="your-applications">
            <ProfileMenu />
            <div className="main-content">
                <header className="header">
                    <h1>Your Applications</h1>
                </header>
                <div className="buttons">
                    <button onClick={() => navigate('/cv')}>
                        <HiOutlinePlusSmall />
                        CV</button>
                    <button onClick={() => navigate('/cover-letter')}>
                        <HiOutlinePlusSmall />
                        Cover Letter
                    </button>
                    <button onClick={() => navigate('/cv')}>
                        <HiOutlinePlusSmall />
                        Application
                    </button>
                </div>
                <div className="your-application-maker"></div>
            </div>
            <div className="applications-list">
                <p>Applications status</p>
                <ul>
                    <li>Application 1</li>
                    <li>Application 2</li>
                </ul>
            </div>
        </div>
    );
}

export default YourApplications;
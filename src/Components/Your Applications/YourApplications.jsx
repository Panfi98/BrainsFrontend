import React from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import '../../App.jsx';
import './YourApplications.css';

const YourApplications = () => {
    const { isLoggedIn, userData, setIsLoggedIn, setToken } = useAuth();
    const navigate = useNavigate();


    return (
        <div className="your-applications">
            <header className="your-applications-header">
                <h1>Your Applications</h1>
            </header>
            <div className="cv-button">
                <button onClick={() => navigate('/cv')}>Create CV</button>
            </div>
            <div className="cover-letter-button">
                <button onClick={() => navigate('/cover-letter')}>Create Cover Letter</button>
            </div>
            <div className="your-application-maker"></div>
            <div className="applications-list">
            </div>
        </div>
    );
}

export default YourApplications;
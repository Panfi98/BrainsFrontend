import React from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import './CVmaker.css';

const StageCertificationInfo = () => {
    const { isLoggedIn, userData, setIsLoggedIn, setToken } = useAuth();
        const navigate = useNavigate();
    
        return(
            <div className="cv-maker">
                <div className="last-stage"></div>
                <div className="cv-maker-header">
                    <h1 className="cv-maker-header">CV Maker</h1>
                    <h2>Stage 6</h2>
                </div>
                <div className="next-stage"></div>
                <div className="cv-form">
                    <form>
                        <h2>Certification info</h2>
                        <div className="input-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" required />
                        </div>
    
                        <div className="input-group">
                            <label htmlFor="description">Description:</label>
                            <input type="text" id="description" name="description" required />
                        </div>
    
                        <div className="input-group">
                            <label htmlFor="date">Date:</label>
                            <input type="date" id="date" name="date" required />
                        </div>
    
                        <div className="input-group">
                            <label htmlFor="url">Url:</label>
                            <input type="url" id="url" name="url" required />
                        </div>
    
                        <div className="input-group">
                            <label htmlFor="type">Type:</label>
                            <input id="type" name="type" required />
                        </div>
    
                        <div className="input-group">
                            <label htmlFor="validTo">Valid to:</label>
                            <input type="date" id="validTo" name="validTo" required></input>
                        </div>
    
                        <button type="submit" onClick={() => navigate("#")}>Next stage</button>
                    </form>
                </div>
                <div className="cv-tips">
    
                </div>
            </div>
        )
}

export default StageCertificationInfo;
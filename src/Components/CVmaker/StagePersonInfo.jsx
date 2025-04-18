import React from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import './CVmaker.css';

const StagePersonInfo = () => {
    const { isLoggedIn, userData, setIsLoggedIn, setToken } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="cv-maker">
            <div className="last-stage"></div>
            <div className="cv-maker-header">
                <h1 className="cv-maker-header">CV Maker</h1>
                <h2>Stage 1</h2>
            </div>
            <div className="next-stage"></div>
            <div className="cv-form">
                <form>
                    <h2>Personal info</h2>
                    <div className="input-group">
                        <label htmlFor="firstName">First name:</label>
                        <input type="text" id="firstName" name="firstName" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="lastName">Last name:</label>
                        <input type="text" id="lastName" name="lastName" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="dateOfBirth">Date of birth:</label>
                        <input type="date" id="dateOfBirth" name="dateOfBirth" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="phone">Phone:</label>
                        <input type="tel" id="phone" name="phone" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="address">Address:</label>
                        <input type="text" id="address" name="address" required></input>
                    </div>

                    <button type="submit" onClick={() => navigate("/stage-education-info")}>Next stage</button>
                </form>
            </div>
            <div className="cv-tips">

            </div>
        </div>
    );
}

export default StagePersonInfo;
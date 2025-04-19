import React from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import './CVmaker.css';

const StagePersonInfo = () => {
    const { isLoggedIn, userData, setIsLoggedIn, setToken } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="cv-maker-container">
            <div className="progress-bar">
                <p>CV progress</p>
                <button className="progress-button" onClick={() => navigate("/stage-person-info")}>Personal info</button>
                <button className="progress-button" onClick={() => navigate("/stage-education-info")}>Education info</button>    
                <button className="progress-button" onClick={() => navigate("/stage-projects-info")}>Project info</button>
                <button className="progress-button" onClick={() => navigate("/stage-skills-info")}>Skills info</button>
                <button className="progress-button" onClick={() => navigate("/stage-experience-info")}>Experience info</button>
                <button className="progress-button" onClick={() => navigate("/stage-certification-info")}>Certification info</button>
            </div>
            <div className="cv-maker">
                <div className="cv-maker-header">
                <h1>CV Maker</h1>
                <h2>Stage 1</h2>
                </div>
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

                        <div className="input-group">
                            <label htmlFor="photo">Your photo:</label>
                            <input type="file" id="photo" name="photo" required />
                        </div>

                        <div className="button-group">
                            <button type="button" onClick={() => navigate("/your-applications")} className="previous-btn">Previous stage</button>
                            <button type="button" onClick={() => navigate("/stage-education-info")} className="next-btn">Next stage</button>
                        </div> 

                    </form>
                </div>
            </div>
            <div className="cv-tips">
            <p>Tips</p>
            <ul>
                <li>Make sure to include all relevant certifications.</li>
                <li>Double-check the dates and URLs for accuracy.</li>
                <li>Keep your descriptions concise and to the point.</li>
            </ul>
            </div>
        </div>
    );
}

export default StagePersonInfo;
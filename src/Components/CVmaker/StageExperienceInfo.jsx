import React from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import './CVmaker.css';

const StageExperienceInfo = () => {
    const { isLoggedIn, userData, setIsLoggedIn, setToken } = useAuth();
    const navigate = useNavigate();

    return(
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
                    <h2>Stage 5</h2>
                </div>
                <div className="next-stage"></div>
                <div className="cv-form">
                    <form>
                        <h2>Experience info</h2>
                        <div className="input-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" required />
                        </div>

                        <div className="input-group">
                            <label htmlFor="organisation">Organisation:</label>
                            <input type="text" id="organisation" name="organisation" required />
                        </div>

                        <div className="input-group">
                            <label htmlFor="type">Type:</label>
                            <input id="type" name="type" required />
                        </div>

                        <div className="input-group">
                            <label htmlFor="position">Position:</label>
                            <input id="position" name="position" required />
                        </div>

                        <div className="input-group">
                            <label htmlFor="description">Description:</label>
                            <textarea id="description" name="description" required />
                        </div>

                        <div className="input-group">
                            <label htmlFor="startedAt">Started at:</label>
                            <input type="date" id="startedAt" name="startedAt" required />
                        </div>

                        <div className="input-group">
                            <label htmlFor="endedAt">Ended at:</label>
                            <input type="date" id="endedAt" name="endedAt" required />
                        </div>  

                        <div className="input-group">
                        <label htmlFor="active">Active:</label>
                        <div className="radio-group">
                            <input type="radio" id="active" name="active" value="active" />
                            <label htmlFor="active">Active</label>
                            <input type="radio" id="non active" name="active" value="non active" />
                            <label htmlFor="non-active">Non active</label>
                        </div>
                        </div>

                        <div className="button-group">
                            <button type="button" onClick={() => navigate("/stage-skills-info")} className="previous-btn">Previous stage</button>
                            <button type="button" onClick={() => navigate("/stage-certification-info")} className="next-btn">Next stage</button>
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

export default StageExperienceInfo;
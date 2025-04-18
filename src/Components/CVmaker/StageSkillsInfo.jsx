import React from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import './CVmaker.css';

const StageSkillsInfo = () => {
    const { isLoggedIn, userData, setIsLoggedIn, setToken } = useAuth();
    const navigate = useNavigate();

    return(
        <div className="cv-maker">
            <div className="last-stage"></div>
            <div className="cv-maker-header">
                <h1 className="cv-maker-header">CV Maker</h1>
                <h2>Stage 4</h2>
            </div>
            <div className="next-stage"></div>
            <div className="cv-form">
                <form>
                    <h2>Skills info</h2>
                    <div className="input-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="description">Description:</label>
                        <input type="text" id="description" name="description" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="type">Type:</label>
                        <select id="type" required>
                            <option value="js">JavaScript</option>
                            <option value="c#">C#</option>
                            <option value="c++">C++</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="level">Level:</label>
                        <select id="level" required>
                            <option value="begynner">Begynner</option>
                            <option value="intermediater">Intermediater</option>
                            <option value="apper-intermidiater">Apper Intermidiater</option>
                        </select>
                    </div>

                    <button type="submit" onClick={() => navigate("/stage-experience-info")}>Next stage</button>
                </form>
            </div>
            <div className="cv-tips">

            </div>
        </div>
    );
}

export default StageSkillsInfo;
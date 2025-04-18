import React from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import './CVmaker.css';

const StageProjectInfo = () => {
    const { isLoggedIn, userData, setIsLoggedIn, setToken } = useAuth();
    const navigate = useNavigate();

    return(
        <div className="cv-maker">
            <div className="last-stage"></div>
            <div className="cv-maker-header">
                <h1 className="cv-maker-header">CV Maker</h1>
                <h2>Stage 3</h2>
            </div>
            <div className="next-stage"></div>
            <div className="cv-form">
                <form>
                    <h2>Project info</h2>
                    <div className="input-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="description">Description:</label>
                        <input type="text" id="description" name="description" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="startedAt">Started at:</label>
                        <input type="date" id="startedAt" name="startedAt" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="complitedAt">Complited at:</label>
                        <input type="date" id="complitedAt" name="complitedAt" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="complited">Complited:</label>
                        <input type="radio" id="complited" name="complited" value="complited" />
                        <label htmlFor="complited">Complited</label>
                        <input type="radio" id="non complited" name="complited" value="non complited" />
                        <label htmlFor="non-complited">Non complited</label>
                    </div>

                    <div className="input-group">
                            <label htmlFor="url">Url:</label>
                            <input type="url" id="url" name="url" required />
                    </div>


                    <button type="submit" onClick={() => navigate("/stage-skills-info")}>Next stage</button>
                </form>
            </div>
            <div className="cv-tips">

            </div>
        </div>
    );
}

export default StageProjectInfo;
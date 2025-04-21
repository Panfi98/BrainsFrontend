import React from "react";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import './CVmaker.css';

const StageProjectInfo = () => {
    const [newProjectData, setNewProjectData] = useState({
        name: "",
        description: "",
        startedAt: "",
        complitedAt: "",
        complited: "",
        url: ""
        });
    
        const [isLoading, setIsLoading] = useState(false);
        const { isLoggedIn, userData, setIsLoggedIn, setToken } = useAuth();
        const navigate = useNavigate();
    
        const onChange = (e) => {
            const { name, value } = e.target;
            setNewProjectData((prev) => ({
                ...newProjectData, [name]: value,
            }));
        };
    
        const onSubmit = async (e) => {
            e.preventDefault();
    
            setIsLoading(true);
            try {
                // const response = await smt
                console.log('Sending project info:', newProjectData);
                if (newProjectData) {
                    navigate("/stage-skills-info");
                    console.log('Successfully set project info');
                }
            }catch (error) {
                console.error('Project info error:', error);
            } finally {
                setIsLoading(false);
            }
        };

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
                <button className="progress-button" onClick={() => navigate("/stage-reference-info")}>Reference info</button>
            </div>
            <div className="cv-maker">
                <div className="cv-maker-header">
                    <h1>CV Maker</h1>
                    <h2>Stage 3</h2>
                </div>
                <div className="cv-form">
                    <form>
                        <h2>Project info</h2>
                        <div className="input-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" onChange={onChange} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="description">Description:</label>
                            <textarea id="description" name="description" onChange={onChange} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="startedAt">Started at:</label>
                            <input type="date" id="startedAt" name="startedAt" onChange={onChange} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="complitedAt">Complited at:</label>
                            <input type="date" id="complitedAt" name="complitedAt" onChange={onChange} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="complited">Complited:</label>
                            <div className="radio-group">
                                <input type="radio" id="complited" name="complited" value="complited" onChange={onChange} />
                                <label htmlFor="complited">Complited</label>
                                <input type="radio" id="non complited" name="complited" value="non complited" onChange={onChange} />
                                <label htmlFor="non-complited">Non complited</label>
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="url">Url:</label>
                            <input type="url" id="url" name="url" onChange={onChange} />
                        </div>

                        <div className="button-group">
                            <button type="button" onClick={() => navigate("/stage-education-info")} className="previous-btn">Previous stage</button>
                            <button type="button" onClick={(onSubmit)} className="next-btn">Next stage</button>
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

export default StageProjectInfo;
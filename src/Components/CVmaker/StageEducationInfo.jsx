import React from "react";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import './CVmaker.css';

const StageEducationInfo = () => {

    const [newEducationData, setNewEducationData] = useState({
        name: "",
        description: "",
        startedAt: "",
        endedAt: "",
        degree: "",
        area: "",
        place: "",
        active: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const { isLoggedIn, userData, setIsLoggedIn, setToken } = useAuth();
    const navigate = useNavigate();

    const onChange = (e) => {
        const { name, value } = e.target;
        setNewEducationData((prev) => ({
            ...newEducationData, [name]: value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        try {
            // const response = await smt
            console.log('Sending education info:', newEducationData);
            if (newEducationData) {
                navigate("/stage-projects-info");
                console.log('Successfully set education info');
            }
        }catch (error) {
            console.error('Education info error:', error);
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
            </div>
            <div className="cv-maker">
                <div className="cv-maker-header">
                    <h1>CV Maker</h1>
                    <h2>Stage 2</h2>
                </div>
                <div className="cv-form">
                    <form>
                        <h2>Education info</h2>
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
                            <label htmlFor="endedAt">Ended at:</label>
                            <input type="date" id="endedAt" name="endedAt" onChange={onChange} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="degree">Degree:</label>
                            <select id="degree" name="degree" onChange={onChange}> 
                                <option value="none">None</option>
                                <option value="bachelor">Bachelor</option>
                                <option value="master">Master</option>
                                <option value="phd">PhD</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label htmlFor="area">Area:</label>
                            <select id="area" name="area" onChange={onChange}>
                                <option value="none">None</option>
                                <option value="economist">Economist</option>
                                <option value="programist">Programist</option>
                                <option value="jurist">Jurist</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label htmlFor="place">Place:</label>
                            <input type="text" id="place" name="place" onChange={onChange}></input>
                        </div>
                    
                        <div className="input-group">
                            <label htmlFor="active">Active:</label>
                            <div className="radio-group">
                                <input type="radio" id="active" name="active" value="active" onChange={onChange} />
                                <label htmlFor="active">Active</label>
                                <input type="radio" id="non active" name="active" value="non active" onChange={onChange} />
                                <label htmlFor="non-active">Not active</label>
                            </div>
                        </div>
                        
                        <div className="button-group">
                            <button type="button" onClick={() => navigate("/stage-person-info")} className="previous-btn">Previous stage</button>
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
    )
}

export default StageEducationInfo;
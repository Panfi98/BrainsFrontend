import React from "react";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import './CVmaker.css';

const StageSkillsInfo = () => {
    const [newSkillsData, setNewSkillsData] = useState({
        name: "",
        description: "",
        type: "",
        level: "",
        });
    
        const [isLoading, setIsLoading] = useState(false);
        const { isLoggedIn, userData, setIsLoggedIn, setToken } = useAuth();
        const navigate = useNavigate();
    
        const onChange = (e) => {
            const { name, value } = e.target;
            setNewSkillsData((prev) => ({
                ...newSkillsData, [name]: value,
            }));
        };
    
        const onSubmit = async (e) => {
            e.preventDefault();
    
            setIsLoading(true);
            try {
                // const response = await smt
                console.log('Sending skills info:', newSkillsData);
                if (newSkillsData) {
                    navigate("/stage-experience-info");
                    console.log('Successfully set skills info');
                }
            }catch (error) {
                console.error('Skills info error:', error);
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
                    <h2>Stage 4</h2>
                </div>
                <div className="next-stage"></div>
                <div className="cv-form">
                    <form>
                        <h2>Skills info</h2>
                        <div className="input-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" onChange={onChange} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="description">Description:</label>
                            <textarea id="description" name="description" onChange={onChange} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="type">Type:</label>
                            <input type="text" id="type" name="type" onChange={onChange} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="level">Level:</label>
                            <select id="level" name="level" onChange={onChange}>
                                <option value="none">None</option>
                                <option value="begynner">Begynner</option>
                                <option value="intermediater">Intermediater</option>
                                <option value="apper-intermidiater">Apper Intermidiater</option>
                            </select>
                        </div>

                        <div className="button-group">
                            <button type="button" onClick={() => navigate("/stage-projects-info")} className="previous-btn">Previous stage</button>
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

export default StageSkillsInfo;
import React from "react";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './CVmaker.css';
import { AddSkills } from "../../Fetcher/AddSkills.js";
import { ProgressBar } from "./CvComponets/Progress-bar.jsx";

const StageSkillsInfo = () => {
    const [newSkillsData, setNewSkillsData] = useState({
        name: "",
        description: "",
        type: "",
        level: "",
        status: "InProgress",
        });
    
        const [isLoading, setIsLoading] = useState(false);
        const { token } = useAuth();
        const { id } = useParams();
        const navigate = useNavigate();
    
        const onChange = (e) => {
            const { name, value } = e.target;
            setNewSkillsData((newSkillsData) => ({
                ...newSkillsData, [name]: value,
            }));
        };
    
        const onSubmit = async (e) => {
            e.preventDefault();

            const payload = {
                name: newSkillsData.name,
                description: newSkillsData.description,
                type: newSkillsData.type,
                level: newSkillsData.level,
                status: "NotStarted",
            };
    
            setIsLoading(true);
            try {
                const response = await AddSkills(payload, token, id);
                console.log('Sending skills info:', payload);
                if (response.ok) {
                    navigate(`/cv/${id}/experience`);
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
            <ProgressBar id={id}/>
            <div className="cv-maker">
                <div className="cv-maker-header">
                    <h1>CV Maker</h1>
                    <h2>Stage 4</h2>
                </div>
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
                                <option value="0">None</option>
                                <option value="1">Begynner</option>
                                <option value="2">Intermediater</option>
                                <option value="3">Apper Intermidiater</option>
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
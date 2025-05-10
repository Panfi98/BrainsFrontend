import React from "react";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import './CVmaker.css';
import { AddExperience } from "../../Fetcher/AddExperience.js";

const StageExperienceInfo = () => {
    const [newExperienceData, setNewExperienceData] = useState({
        name: "",
        description: "",
        startedAt: "",
        endedAt: "",
        active: "",
        type: "",
        organisation: "",
        position: "",
        status: "InProgress",
        }); 
    
        const [isLoading, setIsLoading] = useState(false);
        const { token } = useAuth();
        const { id } = useParams();
        const navigate = useNavigate();
    
        const onChange = (e) => {
            const { name, value } = e.target;
            setNewExperienceData((newExperienceData) => ({
                ...newExperienceData, [name]: value,
            }));
        };
    
        const onSubmit = async (e) => {
                e.preventDefault();
        
                const payload = {
                    name: newExperienceData.name,
                    type: newExperienceData.type,
                    startedAt: new Date(newExperienceData.startedAt).toISOString(), // Преобразование в ISO 8601
                    endedAt: new Date(newExperienceData.endedAt).toISOString(), 
                    description: newExperienceData.description,
                    organisation: newExperienceData.organisation,
                    position: newExperienceData.position,
                    active: newExperienceData.active === "true",
                    status: "NotStarted",
                };
            
                setIsLoading(true);
                try {
                    const response = await AddExperience(payload, token, id);
                    console.log("Sending experience info:", payload);
                    if (response.ok) {
                        navigate(`/cv/${id}/certification`);
                        console.log("Successfully set experience info");
                    } else {
                        const errorDetails = await response.json();
                        console.error("AddExperience failed:", errorDetails);
                        alert(`Error: ${errorDetails.message || "Failed to add experience info"}`);
                    }
                }catch (error) {
                    console.error('Experience info error:', error);
                } finally {
                    setIsLoading(false);
                }
            };

    return(
        <div className="cv-maker-container">
            <div className="progress-bar">
                <p>CV progress</p>
                <button className="progress-button" onClick={() => navigate("/stage-person-info")}>Personal info</button>
                <button className="progress-button" onClick={() => navigate(`/cv/${id}/education`)}>Education info</button>
                <button className="progress-button" onClick={() => navigate(`/cv/${id}/projects`)}>Project info</button>
                <button className="progress-button" onClick={() => navigate(`/cv/${id}/skills`)}>Skills info</button>
                <button className="progress-button" onClick={() => navigate(`/cv/${id}/experience`)}>Experience info</button>
                <button className="progress-button" onClick={() => navigate(`/cv/${id}/certification`)}>Certification info</button>
                <button className="progress-button" onClick={() => navigate(`/cv/${id}/reference`)}>Reference info</button>
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
                            <input type="text" id="name" name="name" onChange={onChange} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="organisation">Organisation:</label>
                            <input type="text" id="organisation" name="organisation" onChange={onChange} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="type">Type:</label>
                            <input id="type" name="type" onChange={onChange} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="position">Position:</label>
                            <input id="position" name="position" onChange={onChange} />
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
                        <label htmlFor="active">Active:</label>
                        <div className="radio-group">
                            <input type="radio" id="active" name="active" value="active" onChange={onChange}/>
                            <label htmlFor="active">Active</label>
                            <input type="radio" id="non active" name="active" value="non active" onChange={onChange}/>
                            <label htmlFor="non-active">Non active</label>
                        </div>
                        </div>

                        <div className="button-group">
                            <button type="button" onClick={() => navigate("/stage-skills-info")} className="previous-btn">Previous stage</button>
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

export default StageExperienceInfo;
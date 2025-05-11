import React from "react";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import './CVmaker.css';
import { AddEducation } from "../../Fetcher/AddEducation.js";

const StageEducationInfo = () => {

    const [newEducationData, setNewEducationData] = useState({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        degree: "",
        type: "",
        place: "",
        active: "",
        status: "InProgress",
    });

    const [isLoading, setIsLoading] = useState(false);
    const { token } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const onChange = (e) => {
        const { name, value } = e.target;
        setNewEducationData((newEducationData) => ({
            ...newEducationData, [name]: value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!resumeData) {
            alert("Resume ID is missing. Please complete the previous step.");
            return;
        }

        const payload = {
            name: newEducationData.name,
            type: newEducationData.type,
            startDate: new Date(newEducationData.startDate).toISOString(),
            endDate: new Date(newEducationData.endDate).toISOString(),
            description: newEducationData.description,
            degree: newEducationData.degree,
            place: newEducationData.place,
            active: newEducationData.active === "true",
            status: "NotStarted",
        };
    
        setIsLoading(true);
        try {
            console.log(`Fetching CV data for ID: ${id}`);
            const response = await AddEducation(payload, token, id);
            console.log("Sending education info:", payload);
            if (response.ok) {
                navigate(`/cv/${id}/projects`);
                console.log("Successfully set education info");
            } else {
                const errorDetails = await response.json();
                console.error("AddEducation failed:", errorDetails);
                alert(`Error: ${errorDetails.message || "Failed to add education info"}`);
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
                            <label htmlFor="startDate">Started at:</label>
                            <input type="date" id="startDate" name="startDate" onChange={onChange} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="endDate">Ended at:</label>
                            <input type="date" id="endDate" name="endDate" onChange={onChange} />
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
                            <label htmlFor="type">Type:</label>
                            <select id="type" name="type" onChange={onChange}>
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
                                <div className="radio-option">
                                    <input type="radio" id="active" name="active" value="true" onChange={onChange} />
                                    <label htmlFor="active">Active</label>
                                </div>
                                <div className="radio-option">
                                    <input type="radio" id="non active" name="non active" value="false" onChange={onChange} />
                                    <label htmlFor="non-active">Not active</label>
                                </div>
                            </div>
                        </div>
                        
                        <div className="button-group">
                            <button type="button" onClick={() => navigate("/stage-person-info")} className="previous-btn">Previous stage</button>
                            <button type="button" onClick={(onSubmit)} className="next-btn" disabled={isLoading}>{isLoading ? "Loading..." : "Next stage"}</button>
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
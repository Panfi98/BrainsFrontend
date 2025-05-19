import React from "react";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import './CVmaker.css';
import { AddProject } from "../../Fetcher/AddProject.js";

const StageProjectInfo = () => {
    const [newProjectData, setNewProjectData] = useState({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        completed: "",
        status: "InProgress",
        });
    
        const [isLoading, setIsLoading] = useState(false);
        const { id } = useParams();
        const { token } = useAuth();
        const navigate = useNavigate();
    
        const onChange = (e) => {
            const { name, value } = e.target;
            setNewProjectData((newProjectData) => ({
                ...newProjectData, [name]: value,
            }));
        };
    
        const onSubmit = async (e) => {
            e.preventDefault();

            const payload = {
                name: newProjectData.name,
                description: newProjectData.description,
                startDate: new Date(newProjectData.startDate).toISOString(), // Преобразование в ISO 8601
                endDate: new Date(newProjectData.endDate).toISOString(),
                completed: newProjectData.completed === "true",
                status: "NotStarted",
            };
    
            setIsLoading(true);
            try {
                const response = await AddProject(payload, token, id);
                console.log('Sending project info:', payload);
                if (response.ok) {
                    navigate(`/cv/${id}/skills`);
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
                            <label htmlFor="startDate">Started at:</label>
                            <input type="date" id="startDate" name="startDate" onChange={onChange} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="endDate">Complited at:</label>
                            <input type="date" id="endDate" name="endDate" onChange={onChange} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="completed">Completed:</label>
                            <div className="radio-group">
                                <div className="radio-option">
                                    <input type="radio" id="completed" name="completed" value="true" onChange={onChange} />
                                    <label htmlFor="completed">Completed</label>
                                </div>
                                <div className="radio-option">
                                    <input type="radio" id="non completed" name="completed" value="false" onChange={onChange} />
                                    <label htmlFor="non-completed">Non completed</label>
                                </div>
                            </div>
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
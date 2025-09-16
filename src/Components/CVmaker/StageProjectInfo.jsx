import React from "react";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import './CVmaker.css';
import { AddProject } from "../../Fetcher/AddProject.js";
import { ProgressBar } from "./CvComponets/Progress-bar.jsx";
import { CvFormProject } from "./CvComponets/CvFormProject.jsx";

const emptyProj = () => ({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    completed: "",
    status: "InProgress",
});

const StageProjectInfo = () => {
    const [projectData, setProjectData] = useState([emptyProj()]);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();

    const onChange = (index) => (e) => {
        const { name, value } = e.target;
        setProjectData((prev) => {
            const updated = [...prev];
            updated[index] = {...updated[index], [name]: value};
            return updated;
        });
    };

    const addForm = () => {
        setProjectData((prev) => [...prev, emptyProj()])
    }

    const deleteForm = (index) => {
        setProjectData((prev) => prev.filter((_, i) => i !== index));
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const payload = projectData.map((proj) => ({
                name: proj.name,
                description: proj.description,
                startDate: new Date(proj.startDate).toISOString(),
                endDate: new Date(proj.endDate).toISOString(),
                completed: proj.completed === "true",
                status: "NotStarted",
            }));

        setIsLoading(true);
        try {
            await Promise.all(payload.map((proj) => AddProject(proj, token, id)));
            console.log('Sending project info:', payload);
            navigate(`/cv/${id}/skills`);
            console.log('Successfully set project info');
        }catch (error) {
            console.error('Project info error:', error);
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
                    <h2>Stage 3</h2>
                </div>
                <div className="cv-form">
                    <form onSubmit={onSubmit}>
                        {projectData.map((proj, index) => (
                            <CvFormProject
                                key={index}
                                index={index}
                                projData={proj}
                                onChange={onChange(index)}
                                onRemove={() => deleteForm(index)} 
                            />
                        ))}
                        <button type="button" className="add-form-btn" onClick={addForm}>Add education</button>
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
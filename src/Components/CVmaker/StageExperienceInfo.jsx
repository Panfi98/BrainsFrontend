import React from "react";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import './CVmaker.css';
import { AddExperience } from "../../Fetcher/AddExperience.js";
import { ProgressBar } from "./CvComponets/Progress-bar.jsx";
import { CvFormExperience } from "./CvComponets/CvFormExperience.jsx";

const emptyExp = () => ({
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

const StageExperienceInfo = () => {
    const [experienceData, setExperienceData] = useState([emptyExp()]); 
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const onChange = (index, e) => {
        const { name, value } = e.target;
        setExperienceData((prev) => {
            const updated = [...prev];
            updated[index] = {...updated[index], [name]: value};
            return updated;
        });
    };

    const AddExperience = () => {
        setExperienceData((prev) => [...prev, emptyExp()])
    }

    const onSubmit = async (e) => {
            e.preventDefault();
    
            const payload = experienceData.map((exp) => ({
                name: exp.name,
                type: exp.type,
                startedAt: new Date(exp.startedAt).toISOString(), 
                endedAt: new Date(exp.endedAt).toISOString(), 
                description: exp.description,
                organisation: exp.organisation,
                position: exp.position,
                active: exp.active === "true",
                status: "NotStarted",
            }));
        
            setIsLoading(true);
            try {
                await Promise.all(payload.map((exp) => AddExperience(exp, token, id)));
                console.log("Sending experience info:", payload);
                navigate(`/cv/${id}/certification`);
                console.log("Successfully set experience info");
            }catch (error) {
                console.error('Experience info error:', error);
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
                    <h2>Stage 5</h2>
                </div>
                <div className="cv-form">
                    <form onSubmit={onSubmit}>
                        {experienceData.map((exp, index) => (
                            <CvFormExperience
                                key={index}
                                index={index}
                                onChange={onChange}
                                expData={exp}
                            />
                        ))}
                        <button type="button" className="add-form-btn" onClick={AddExperience}>Add Experience</button>
                        <div className="button-group">
                            <button type="button" onClick={() => navigate("/stage-skills-info")} className="previous-btn">Previous stage</button>
                            <button type="submit" onClick={(onSubmit)} className="next-btn">Next stage</button>
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
import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useResume } from "../../Context/ResumeContext.jsx";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import './CVmaker.css';
import { AddExperience } from "../../Fetcher/PostFetcher/AddExperience.js";
import { GetExperiencesById } from "../../Fetcher/GetFetcher/GetExperience.js";
import { ProgressBar } from "./CvComponets/Progress-bar.jsx";
import { CvFormExperience } from "./CvComponets/CvFormExperience.jsx";
import { UpdateExperience } from "../../Fetcher/PutFetcher/UpdateExperience.js";
import { DeleteExperience } from "../../Fetcher/DeleteFetcher/DeleteExperience.js";

const emptyExp = () => ({
    id: 0,
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
    const {resumeData, setResumeData} = useResume();
    const [experienceData, setExperienceData] = useState(
        resumeData.experiences.length > 0 ? resumeData.experiences : [emptyExp()]); 
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect (() => {
        if (resumeData.experiences?.length > 0) {
            setExperienceData(resumeData.experiences);
        } else {
            const GetExperience = async () => {
            try{
                const data = await GetExperiencesById(id, token);
                if (data && data.length > 0) {
                    setExperienceData(data);
                }
            }catch(err){
                console.error(err)
            }
        }
            GetExperience();
    }
    }, [id, token, setResumeData]);

    const onChange = (index, e) => {
        const { name, value } = e.target;
        setExperienceData((prev) => {
            const updated = [...prev];
            updated[index] = {...updated[index], [name]: value};
            return updated;
        });
    };

    const AddForm = () => {
        setExperienceData((prev) => {
            const updated = [...prev, emptyExp()];
            setResumeData((resume) => ({...resume, experiences: updated}))
            return updated;
        });
    }


    const deleteForm = async (index) => {
            const toDelete = experienceData[index];
            const updated = experienceData.filter((_, i) => i !== index);
    
            setExperienceData(updated);
            setResumeData(r => ({ ...r, experiences: updated }));
    
            try {
                if (toDelete?.id) await DeleteExperience(toDelete.id, token);
            } catch (e) {
                console.error("Feiled to delete: ", e);
                setExperienceData(prev => {
                const roll = [...prev];
                roll.splice(index, 0, toDelete);
                return roll;
                });
                setResumeData(r => ({ ...r, experiences: experienceData }));
            }
        };

    const onSubmit = async (e) => {
            e.preventDefault();
    
            const payload = experienceData.filter((exp) => exp && exp.name?.trim() !== "")
            .map((exp) => ({
                id: exp.id ?? 0,
                name: exp.name,
                type: exp.type,
                startedAt: new Date(exp.startedAt).toISOString(), 
                endedAt: new Date(exp.endedAt).toISOString(), 
                description: exp.description,
                organisation: exp.organisation,
                position: exp.position,
                active: exp.active,
                status: "InProgress",
            }));
        
            setIsLoading(true);
            try {
                await Promise.all(payload.map((exp) => {
                    if (exp.id !== null && exp.id > 0) {
                        console.log("Updating")
                        return UpdateExperience(
                            {experienceId: exp.id,
                            experienceData: exp,
                            token: token});
                    }else{
                        return AddExperience(exp, token, id)
                    }}));
                console.log("Sending experience info:", payload);
                 setResumeData(prev => ({ ...prev, experiences: payload }));
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
                                onRemove={() => deleteForm(index)}
                                expData={exp}
                            />
                        ))}
                        <button type="button" className="add-form-btn" onClick={AddForm}>Add Experience</button>
                        <div className="button-group">
                            <button type="button" onClick={() => navigate(`/cv/${id}/skills`)} className="previous-btn">Previous stage</button>
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
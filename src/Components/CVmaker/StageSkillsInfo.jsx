import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useResume } from "../../Context/ResumeContext.jsx";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './CVmaker.css';
import { AddSkills } from "../../Fetcher/PostFetcher/AddSkills.js";
import { ProgressBar } from "./CvComponets/Progress-bar.jsx";
import { CvFormSkills } from "./CvComponets/CvFormSkills.jsx";
import { GetSkillsById } from "../../Fetcher/GetFetcher/GetSkills.js";

const emptySkl = () => ({
    name: "",
    description: "",
    type: "",
    level: "",
    status: "InProgress",
})

const StageSkillsInfo = () => {
    const {resumeData, setResumeData} = useResume();
    const [skillsData, setSkillsData] = useState(
        resumeData.skills.length > 0 ? resumeData.skills : [emptySkl()]);
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect (() => {
        const GetSkills = async () => {
            try{
                const data = await GetSkillsById(id, token);
                if (data && data.length > 0) {
                    setResumeData(prev => ({ ...prev, skills: data }));
                    setSkillsData(data);
                }
            }catch(err){
                console.error(err)
            }
        }
        if(resumeData.skills.length === 0){
            GetSkills();
        }
    }, [id, token, setResumeData]);
    
    const onChange = (index, e) => {
        const { name, value } = e.target;
        setSkillsData((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [name]: value };
            
        setResumeData((resume) => ({
            ...resume, skills:updated,
        }))
        
        return updated;
        });
    };
    
    const addForm = () => {
        setSkillsData((prev) => {
            const updated = [...prev, emptySkl()];
            setResumeData((resume) => ({...resume, skills: updated}))
            return updated;
        });
    }

    const deleteForm = (index) => {
        setSkillsData((prev) => {
            const updated = prev.filter((_, i) => i !== index);
            setResumeData((resume) => ({...resume, skills: updated}))
            return updated;
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const payload = skillsData.map((skl) => ({
            name: skl.name,
            description: skl.description,
            type: skl.type,
            level: skl.level,
            status: "NotStarted",
        }));

        setIsLoading(true);
        try {
            await Promise.all(payload.map((skl) => AddSkills(skl, token, id)));
            console.log('Sending skills info:', payload);
            navigate(`/cv/${id}/experience`);
            console.log('Successfully set skills info');
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
                    <form onSubmit={onSubmit}>
                        {skillsData.map((skl, index) => (
                            <CvFormSkills 
                                key={index}
                                index={index}
                                onChange={onChange}
                                onRemove={() => deleteForm(index)}
                                sklData={skl}
                            />
                        ))}
                        <div>
                            <button type="button" className="add-form-btn" onClick={addForm}>Add skill</button>
                        </div>
                        <div className="button-group">
                            <button type="button" onClick={() => navigate("/stage-projects-info")} className="previous-btn">Previous stage</button>
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

export default StageSkillsInfo;
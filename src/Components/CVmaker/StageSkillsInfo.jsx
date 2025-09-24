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
import { UpdateSkill } from "../../Fetcher/PutFetcher/UpdateSkill.js";
import { DeleteSkill } from "../../Fetcher/DeleteFetcher/DeleteSkill.js";

const emptySkl = () => ({
    id: 0,
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
        if (resumeData.skills?.length > 0) {
            setSkillsData(resumeData.skills);
        } else {
            const GetSkills = async () => {
            try{
                const data = await GetSkillsById(id, token);
                if (data && data.length > 0) {
                    setSkillsData(data);
                }
            }catch(err){
                console.error(err)
            }
        }
            GetSkills();
        }
    }, [id, token, resumeData.skills]);
    
    const onChange = (index, e) => {
        const { name, value } = e.target;
        setSkillsData((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [name]: value };
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

    const deleteForm = async (index) => {
            const toDelete = skillsData[index];
            const updated = skillsData.filter((_, i) => i !== index);
    
            setSkillsData(updated);
            setResumeData(r => ({ ...r, skills: updated }));
    
            try {
                if (toDelete?.id) await DeleteSkill(toDelete.id, token);
            } catch (e) {
                console.error("Feiled to delete: ", e);
                setSkillsData(prev => {
                const roll = [...prev];
                roll.splice(index, 0, toDelete);
                return roll;
                });
                setResumeData(r => ({ ...r, skills: skillsData }));
            }
        };

    const onSubmit = async (e) => {
        e.preventDefault();

        const payload = skillsData.filter((skl) => skl && skl.name?.trim() !== "")
        .map((skl) => ({
            id: skl.id ?? 0,
            name: skl.name,
            description: skl.description,
            type: skl.type,
            level: skl.level,
            status: "InProgress",
        }));

        setIsLoading(true);
        try {
            await Promise.all(payload.map((skl) => {
                if (skl.id !== null && skl.id > 0) {
                    return UpdateSkill(
                        {skillId: skl.id,
                        skillsData: skl,
                        token: token});
                }else{
                    return AddSkills(skl, token, id)
                }}));
            console.log('Sending skills info:', payload);
            setResumeData(prev => ({...prev, skills: payload}))
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
                            <button type="button" onClick={() => navigate(`/cv/${id}/projects`)} className="previous-btn">Previous stage</button>
                            <button type="submit" className="next-btn">Next stage</button>
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
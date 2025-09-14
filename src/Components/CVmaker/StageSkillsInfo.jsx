import React from "react";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './CVmaker.css';
import { AddSkills } from "../../Fetcher/AddSkills.js";
import { ProgressBar } from "./CvComponets/Progress-bar.jsx";
import { CvFormSkills } from "./CvComponets/CvFormSkills.jsx";

const emptySkl = () => ({
    name: "",
    description: "",
    type: "",
    level: "",
    status: "InProgress",
})

const StageSkillsInfo = () => {
    const [skillsData, setSkillsData] = useState([emptySkl()]);
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    
    const onChange = (index, e) => {
        const { name, value } = e.target;
        setSkillsData((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [name]: value };
            return updated;
        });
    };

    const addSkill = () => {
        setSkillsData((prev) => [...prev, emptySkl()]);
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
                                sklData={skl}
                            />
                        ))}
                        <div>
                            <button type="button" className="add-form-btn" onClick={addSkill}>Add skill</button>
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
import React from "react";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import './CVmaker.css';
import { AddEducation } from "../../Fetcher/AddEducation.js";
import { ProgressBar } from "./CvComponets/Progress-bar.jsx";
import { CvFormEducation } from "./CvComponets/CvFromEducation.jsx";

const emptyEdu = () => ({
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

const StageEducationInfo = () => {

    const [educationData, setEducationData] = useState([emptyEdu()]);
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const onChange = (index, e) => {
        const { name, value } = e.target;
        setEducationData((prev) => {
            const updated = [...prev];
            updated[index] = {...updated[index], [name]: value};
            return updated;
        });
    };

    const addForm = () => {
        setEducationData((prev) => [...prev, emptyEdu()])
    }

    const onSubmit = async (e) => {
        e.preventDefault();
    
        const payload = educationData.map((edu) => ({
            name: edu.name,
            type: edu.type,
            startDate: new Date(edu.startDate).toISOString(),
            endDate: new Date(edu.endDate).toISOString(),
            description: edu.description,
            degree: edu.degree,
            place: edu.place,
            active: edu.active === "true",
            status: "NotStarted",
        }));

        setIsLoading(true);
        try {
            await Promise.all(payload.map((edu) => AddEducation(edu, token, id)));
            console.log("Sending education info:", payload);
            navigate(`/cv/${id}/projects`);
            console.log("Successfully set education infof");
        }catch (error) {
            console.error('Education info error:', error);
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
                    <h2>Stage 2</h2>
                </div>
                <div className="cv-form">
                    <form onSubmit={onSubmit}>
                        {educationData.map((edu, index) => (
                            <CvFormEducation 
                                key={index}
                                index={index} 
                                onChange={onChange}
                                eduData = {edu}
                            />
                        ))}
                        <button className="add-form-btn" onClick={addForm}>Add education</button>
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
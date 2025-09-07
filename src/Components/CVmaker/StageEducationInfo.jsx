import React from "react";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import './CVmaker.css';
import { AddEducation } from "../../Fetcher/AddEducation.js";
import { ProgressBar } from "./CvComponets/Progress-bar.jsx";
import { CvFormEducation } from "./CvComponets/CvFromEducation.jsx";

const emptyEducation = {
  name: "",
  description: "",
  startDate: "",
  endDate: "",
  degree: "",
  type: "",
  place: "",
  active: "",
  status: "InProgress",
};

const StageEducationInfo = () => {

    const [newEducationData, setNewEducationData] = useState([{
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        degree: "",
        type: "",
        place: "",
        active: "",
        status: "InProgress",
    }]);

    const [isLoading, setIsLoading] = useState(false);
    const { token } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const onChange = (index) => (e) => {
        const { name, value } = e.target;
        setNewEducationData((prev) => {
            const updated = [...prev];
            updated[index] = {...updated[index], [name]: value};
            return updated;
        });
    };

    const addForm = () => {
        setNewEducationData((prev) => [...prev, {emptyEducation}])
    }

    const onSubmit = async (e) => {
        e.preventDefault();

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
            <ProgressBar id={id}/>
            <div className="cv-maker">
                <div className="cv-maker-header">
                    <h1>CV Maker</h1>
                    <h2>Stage 2</h2>
                </div>
                <div className="cv-form">
                    {newEducationData.map((edu, index) => (
                        <CvFormEducation 
                            key={index}
                            index={index} 
                            onChange={onChange(index)}
                            value = {edu}    
                            addForm={addForm}
                        />
                    ))}
                    <button className="add-form-btn" onClick={addForm}>Add education</button>
                    <div className="button-group">
                        <button type="button" onClick={() => navigate("/stage-person-info")} className="previous-btn">Previous stage</button>
                        <button type="button" onClick={(onSubmit)} className="next-btn" disabled={isLoading}>{isLoading ? "Loading..." : "Next stage"}</button>
                    </div> 
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
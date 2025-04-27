import React from "react";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useResume } from "../../Context/ResumeContext.jsx";
import { useNavigate } from "react-router-dom";
import './CVmaker.css';
import { AddReference } from "../../Fetcher/AddReference.js";

const StageReferenceInfo = () => {
    const [newReferenceData, setNewReferenceData] = useState({
        firstName: "",
        lastName: "",
        position: "",
        email: "",
        phoneNumber: "",
        status: "NotStarted",
        });
    
        const [isLoading, setIsLoading] = useState(false);
        const { token } = useAuth();
        const { resumeData } = useResume();
        const navigate = useNavigate();
    
        const onChange = (e) => {
            const { name, value } = e.target;
            setNewReferenceData((newReferenceData) => ({
                ...newReferenceData, [name]: value,
            }));
        };
    
        const onSubmit = async (e) => {
            e.preventDefault();
    
            setIsLoading(true);
            try {
                const response = await AddReference(newReferenceData, token, resumeData.id);
                console.log('Sending reference info:', newReferenceData);
                if (response.ok) {
                    navigate("#");
                    console.log('Successfully set reference info');
                }
            }catch (error) {
                console.error('Reference info error:', error);
            } finally {
                setIsLoading(false);
            }
        };

    return(
        <div className="cv-maker-container">
            <div className="progress-bar">
                <p>CV progress</p>
                <button className="progress-button" onClick={() => navigate("/stage-person-info")}>Personal info</button>
                <button className="progress-button" onClick={() => navigate("/stage-education-info")}>Education info</button>    
                <button className="progress-button" onClick={() => navigate("/stage-projects-info")}>Project info</button>
                <button className="progress-button" onClick={() => navigate("/stage-skills-info")}>Skills info</button>
                <button className="progress-button" onClick={() => navigate("/stage-experience-info")}>Experience info</button>
                <button className="progress-button" onClick={() => navigate("/stage-certification-info")}>Certification info</button>
                <button className="progress-button" onClick={() => navigate("/stage-reference-info")}>Reference info</button>
            </div>
            <div className="cv-maker">
                <div className="cv-maker-header">
                    <h1>CV Maker</h1>
                    <h2>Stage 7</h2>
                </div>
                <div className="cv-form">
                    <form>
                        <h2>Reference info</h2>
                        <div className="input-group">
                            <label htmlFor="firstName">First name:</label>
                            <input type="text" id="firstName" name="firstName" onChange={onChange} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="lastName">Last name:</label>
                            <input type="text" id="lastName" name="lastName" onChange={onChange} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="position">Position:</label>
                            <input id="position" name="position" onChange={onChange} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" onChange={onChange} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="phoneNumber">Phone:</label>
                            <input type="text" id="phoneNumber" name="phoneNumber" onChange={onChange} />
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

export default StageReferenceInfo;
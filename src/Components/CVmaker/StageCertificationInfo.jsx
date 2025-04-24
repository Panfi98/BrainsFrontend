import React from "react";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import './CVmaker.css';
import { AddCertification } from "../../Fetcher/AddCertification.js";

const StageCertificationInfo = () => {
    const [newCertificationData, setNewCertificationData] = useState({
        name: "",
        description: "",
        date: "",
        url: "",
        type: "",
        validTo: "",
        status: "InProgress",
        });

            const [isLoading, setIsLoading] = useState(false);
            const { token } = useAuth();
            const navigate = useNavigate();
        
            const onChange = (e) => {
                const { name, value } = e.target;
                setNewCertificationData((newCertificationData) => ({
                    ...newCertificationData, [name]: value,
                }));
            };
        
            const onSubmit = async (e) => {
                e.preventDefault();

                const payload = {
                    name: newCertificationData.name,
                    description: newCertificationData.description,
                    date: new Date(newCertificationData.date).toISOString(), // Преобразование в ISO 8601
                    url: newCertificationData.url,
                    type: newCertificationData.type,
                    validTo: new Date(newCertificationData.validTo).toISOString(), // Преобразование в ISO 8601
                    status: "NotStarted",
                };
        
                setIsLoading(true);
                try {
                    const response = await AddCertification(payload, token);
                    console.log('Sending certification info:', payload);
                    if (response.ok) {
                        navigate("/stage-reference-info");
                        console.log('Successfully set certification info');
                    }
                }catch (error) {
                    console.error('Certification info error:', error);
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
                    <h2>Stage 6</h2>
                </div>
                <div className="cv-form">
                    <form>
                        <h2>Certification info</h2>
                        <div className="input-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" onChange={onChange} />
                        </div>
    
                        <div className="input-group">
                            <label htmlFor="description">Description:</label>
                            <textarea id="description" name="description" onChange={onChange} />
                        </div>
    
                        <div className="input-group">
                            <label htmlFor="date">Date:</label>
                            <input type="date" id="date" name="date" onChange={onChange} />
                        </div>
    
                        <div className="input-group">
                            <label htmlFor="url">Url:</label>
                            <input type="url" id="url" name="url" onChange={onChange} />
                        </div>
    
                        <div className="input-group">
                            <label htmlFor="type">Type:</label>
                            <input id="type" name="type" onChange={onChange} />
                        </div>
    
                        <div className="input-group">
                            <label htmlFor="validTo">Valid to:</label>
                            <input type="date" id="validTo" name="validTo" onChange={onChange}></input>
                        </div>
    
                        <div className="button-group">
                            <button type="button" onClick={() => navigate("/stage-experience-info")} className="previous-btn">Previous stage</button>
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
        )
}

export default StageCertificationInfo;
import React from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './CVmaker.css';
import { CreatePerson } from "../../Fetcher/CreatePerson.js";

const StagePersonInfo = () => {
    const [newPersonData, setNewPersonData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        birthday: "",
        pictureURL: "",
        summary: "",
        status: "InProgress",
    });

    const [isLoading, setIsLoading] = useState(false);
    const { isLoggedIn, userData, setIsLoggedIn, setToken } = useAuth();
    const {token} = useAuth();
    const navigate = useNavigate();

    const onChange = (e) => {
        const { name, value } = e.target;
        setNewPersonData((prev) => ({
            ...prev, [name]: value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!newPersonData.firstName || !newPersonData.lastName || !newPersonData.birthday || !newPersonData.email || !newPersonData.phoneNumber || !newPersonData.address || !newPersonData.pictureURL) {
            alert('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        try {
            const response = await CreatePerson(newPersonData, token);
            console.log('Sending personal info:', newPersonData);
            if (response.ok) {
                navigate("/stage-education-info");
                console.log('Successfully set personal info');
            }
        }catch (error) {
            console.error('Personal info error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
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
                <h2>Stage 1</h2>
                </div>
                <div className="cv-form">
                    <form>
                        <h2>Personal info</h2>
                        <div className="input-group">
                            <label htmlFor="firstName">First name:</label>
                            <input type="text" id="firstName" name="firstName" value={newPersonData.firstName} onChange={onChange} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="lastName">Last name:</label>
                            <input type="text" id="lastName" name="lastName" value={newPersonData.lastName} onChange={onChange} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="birthday">Date of birth:</label>
                            <input type="date" id="birthday" name="birthday" value={newPersonData.birthday} onChange={onChange} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" value={newPersonData.email} onChange={onChange} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="phoneNumber">Phone:</label>
                            <input type="text" id="phoneNumber" name="phoneNumber" value={newPersonData.phoneNumber} onChange={onChange} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="address">Address:</label>
                            <input type="text" id="address" name="address" value={newPersonData.address} onChange={onChange} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="pictureURL">Your photo:</label>
                            <input type="text" id="pictureURL" name="pictureURL" value={newPersonData.pictureURL} onChange={onChange} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="summary">About you:</label>
                            <textarea id="summary" name="summary" value={newPersonData.summary} onChange={onChange} />
                        </div>

                        <div className="button-group">
                            <button type="button" onClick={() => navigate("/your-applications")} className="previous-btn">Previous stage</button>
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
    );
}

export default StagePersonInfo;
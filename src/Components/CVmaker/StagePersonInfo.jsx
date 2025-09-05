import React from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './CVmaker.css';
import { CreatePerson } from "../../Fetcher/CreatePerson.js";
import { ProgressBar } from "./CvComponets/Progress-bar.jsx";

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
    const {token} = useAuth();

    const navigate = useNavigate();

    const onChange = (e) => {
        const { name, value } = e.target;
        setNewPersonData((newPersonData) => ({
            ...newPersonData, [name]: value,
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
                const responceData = await response.json();
                
                const resumeId = responceData.data.id;
                console.log('Resume ID:', resumeId);
                
                navigate(`/cv/${resumeId}/education`);
                console.log('Successfully set personal info');
            }
        } catch (error) {
            console.error('Personal info error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="cv-maker-container">
            <ProgressBar id={null}/>
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
                            <input type="text" id="firstName" name="firstName" onChange={onChange} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="lastName">Last name:</label>
                            <input type="text" id="lastName" name="lastName" onChange={onChange} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="birthday">Date of birth:</label>
                            <input type="date" id="birthday" name="birthday" onChange={onChange} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" onChange={onChange} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="phoneNumber">Phone:</label>
                            <input type="text" id="phoneNumber" name="phoneNumber" onChange={onChange} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="address">Address:</label>
                            <input type="text" id="address" name="address" onChange={onChange} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="pictureURL">Your photo:</label>
                            <input type="text" id="pictureURL" name="pictureURL" onChange={onChange} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="summary">About you:</label>
                            <textarea id="summary" name="summary" onChange={onChange} />
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
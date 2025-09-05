import React from "react";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import './CVmaker.css';
import { AddReference } from "../../Fetcher/AddReference.js";
import { ProgressBar } from "./CvComponets/Progress-bar.jsx";

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
    const { id } = useParams();
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
            const response = await AddReference(newReferenceData, token, id);
            console.log('Sending reference info:', newReferenceData);

            if (response) {
                navigate(`/cv/${id}/my-cv`);
                console.log('Successfully set reference info');
            } else {
                console.error('Failed to add reference info:', response);
            }
        }catch (error) {
            console.error('Reference info error:', error);
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
                    <h2>Stage 7</h2>
                </div>
                <div className="cv-form">
                    <form onSubmit={onSubmit}>
                        <h2>Reference info</h2>
                        <div className="input-group">
                            <label htmlFor="firstName">First name:</label>
                            <input type="text" id="firstName" name="firstName" onChange={onChange} value={newReferenceData.firstName} required /> {/* Added value and required */}
                        </div>

                        <div className="input-group">
                            <label htmlFor="lastName">Last name:</label>
                            <input type="text" id="lastName" name="lastName" onChange={onChange} value={newReferenceData.lastName} required /> {/* Added value and required */}
                        </div>

                        <div className="input-group">
                            <label htmlFor="position">Position:</label>
                            <input id="position" name="position" onChange={onChange} value={newReferenceData.position} required /> {/* Added value and required */}
                        </div>

                        <div className="input-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" onChange={onChange} value={newReferenceData.email} required /> {/* Added value and required */}
                        </div>

                        <div className="input-group">
                            <label htmlFor="phoneNumber">Phone:</label>
                            <input type="tel" id="phoneNumber" name="phoneNumber" onChange={onChange} value={newReferenceData.phoneNumber} required /> {/* Changed type to tel, added value and required */}
                        </div>

                        <div className="button-group">
                            <button type="button" onClick={() => navigate("/stage-certification-info")} className="previous-btn">Previous stage</button>
                            <button type="submit" className="next-btn" disabled={isLoading}>
                                {isLoading ? 'Saving...' : 'Finish'} {/* Changed text and added disabled state */}
                            </button>
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
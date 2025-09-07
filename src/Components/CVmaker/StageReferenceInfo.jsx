import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import './CVmaker.css';
import { AddReference } from "../../Fetcher/AddReference.js";
import { ProgressBar } from "./CvComponets/Progress-bar.jsx";
import { CvFormReference } from "./CvComponets/CvFormReference.jsx";

const emptyRef = () => ({
  firstName: "",
  lastName: "",
  position: "",
  email: "",
  phoneNumber: "",
  status: "NotStarted",
});

const StageReferenceInfo = () => {
    const [newReferenceData, setNewReferenceData] = useState([emptyRef()]);
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const onChange = (index, e) => {
        const { name, value } = e.target;
        setNewReferenceData((prev) => {
            const next = [...prev];
            next[index] = { ...next[index], [name]: value };
        return next;
        });
    };

    const addReferenceRow = () => {
        setNewReferenceData((prev) => [...prev, emptyRef()]);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        try {
            await Promise.all(newReferenceData.map((ref) => AddReference(ref, token, id)));
            console.log('Sending reference info:', newReferenceData);
            navigate(`/cv/${id}/my-cv`);
            console.log('Successfully set reference info');
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
                        {newReferenceData.map((ref, index) => (
                            <CvFormReference
                                key={index}
                                index={index}
                                refData={ref}
                                onChange={onChange} />
                        ))}
                        <div className="button-row">
                            <button
                                type="button"
                                className="secondary"
                                onClick={addReferenceRow}
                            >
                                + Добавить контакт
                            </button>
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
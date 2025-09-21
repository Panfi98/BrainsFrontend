import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import './CVmaker.css';
import { AddReference } from "../../Fetcher/PostFetcher/AddReference.js";
import { ProgressBar } from "./CvComponets/Progress-bar.jsx";
import { CvFormReference } from "./CvComponets/CvFormReference.jsx";
import { GetReferencesById } from "../../Fetcher/GetFetcher/GetReference.js";
import { useResume } from "../../Context/ResumeContext.jsx";

const emptyRef = () => ({
  firstName: "",
  lastName: "",
  position: "",
  email: "",
  phoneNumber: "",
  status: "NotStarted",
});

const StageReferenceInfo = () => {

    const {resumeData, setResumeData} = useResume();
    const [referenceData, setReferenceData] = useState(
        resumeData.references.length > 0 ? resumeData.references :[emptyRef()]);
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect (() => {
            const GetReference = async () => {
                try{
                    const data = await GetReferencesById(id, token);
                    if (data && data.length > 0) {
                        setResumeData(prev => ({ ...prev, references: data }));
                        setReferenceData(data);
                    }
                }catch(err){
                    console.error(err)
                }
            }
            if(resumeData.references.length === 0){
                GetReference();
            }
        }, [id, token, setResumeData]);

    const onChange = (index, e) => {
        const { name, value } = e.target;
        setReferenceData((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [name]: value };
            
            setResumeData((resume) => ({
            ...resume, references:updated,
        }))

        return updated;
        });
    };

    const addForm = () => {
        setReferenceData((prev) => {
            const updated = [...prev, emptyRef()];
            setResumeData((resume) => ({...resume, references: updated}))
            return updated;
        });
    };

    const deleteForm = (index) => {
        setReferenceData((prev) => {
            const updated = prev.filter((_, i) => i !== index);
            setResumeData((resume) => ({...resume, references: updated}))
            return updated;
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        try {
            await Promise.all(referenceData.map((ref) => AddReference(ref, token, id)));
            console.log('Sending reference info:', referenceData);
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
                        {referenceData.map((ref, index) => (
                            <CvFormReference
                                key={index}
                                index={index}
                                refData={ref}
                                onChange={onChange} 
                                onRemove={() => deleteForm(index)}
                            />
                        ))}
                        <div className="button-row">
                            <button type="button" className="add-form-btn" onClick={addForm}>Add reference</button>
                        </div>
                        <div className="button-group">
                            <button type="button" onClick={() => navigate("/stage-certification-info")} className="previous-btn">Previous stage</button>
                            <button type="submit" className="next-btn" disabled={isLoading}>
                                {isLoading ? 'Saving...' : 'Finish'}
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
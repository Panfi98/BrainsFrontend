import React from "react";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './CVmaker.css';
import { AddCertification } from "../../Fetcher/AddCertification.js";
import { ProgressBar } from "./CvComponets/Progress-bar.jsx";
import { CvFormCertification } from "./CvComponets/CvFormCertification.jsx";

const emptyCer = () => ({
    name: "",
    description: "",
    date: "",
    url: "",
    type: "",
    validTo: "",
    status: "InProgress",
})

const StageCertificationInfo = () => {
    const [certificationData, setCertificationData] = useState([emptyCer()]);
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const onChange = (index, e) => {
        const { name, value } = e.target;
        setCertificationData((prev) => {
            const updated = [...prev];
            updated[index] = {...updated[index], [name]: value};
            return updated;
        });
    };

    const AddForm = () => {
        setCertificationData((prev) => [...prev, emptyCer()])
    }

    const deleteForm = (index) => {
        setCertificationData((prev) => prev.filter((_, i) => i !== index));
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const payload = certificationData.map((cer) => ({
            name: cer.name,
            description: cer.description,
            date: new Date(cer.date).toISOString(),
            url: cer.url,
            type: cer.type,
            validTo: new Date(cer.validTo).toISOString(),
            status: "NotStarted",
        }));

        setIsLoading(true);
        try {
            await Promise.all(payload.map((cer) => AddCertification(cer, token, id)));
            console.log('Sending certification info:', payload);
            navigate(`/cv/${id}/reference`);
            console.log('Successfully set certification info');
        }catch (error) {
            console.error('Certification info error:', error);
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
                    <h2>Stage 6</h2>
                </div>
                <div className="cv-form">
                    <form>
                        {certificationData.map((cer, index) => (
                            <CvFormCertification
                                key={index}
                                index={index}
                                onChange={onChange}
                                onRemove={() => deleteForm(index)}
                                cerData={cer}
                            />
                        ))}
                        <button type="button" className="add-form-btn" onClick={AddForm}>Add certification</button>
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

export default StageCertificationInfo;
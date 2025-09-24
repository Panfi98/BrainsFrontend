import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './CVmaker.css';
import { AddCertification } from "../../Fetcher/PostFetcher/AddCertification.js";
import { GetCertificationsById } from "../../Fetcher/GetFetcher/GetCertification.js";
import { ProgressBar } from "./CvComponets/Progress-bar.jsx";
import { CvFormCertification } from "./CvComponets/CvFormCertification.jsx";
import { useResume } from "../../Context/ResumeContext.jsx";
import { UpdateCertification } from "../../Fetcher/PutFetcher/UpdateCertification.js";
import { DeleteCertification } from "../../Fetcher/DeleteFetcher/DeleteCertification.js";

const emptyCer = () => ({
    id: 0,
    name: "",
    description: "",
    date: "",
    url: "",
    type: "",
    validTo: "",
    status: "InProgress",
})

const StageCertificationInfo = () => {

    const {resumeData, setResumeData} = useResume();
    const [certificationData, setCertificationData] = useState(
        resumeData.certifications.length > 0 ? resumeData.certifications : [emptyCer()]);
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect (() => {
        if (resumeData.certifications?.length > 0) {
            setCertificationData(resumeData.certifications);
        } else {
            const GetCertification = async () => {
            try{
                const data = await GetCertificationsById(id, token);
                if (data && data.length > 0) {
                    setResumeData(prev => ({ ...prev, certifications: data }));
                    setCertificationData(data);
                }
            }catch(err){
                console.error(err)
            }
        }
            GetCertification();
        }
    }, [id, token, setResumeData]);

    const onChange = (index, e) => {
        const { name, value } = e.target;
        setCertificationData((prev) => {
            const updated = [...prev];
            updated[index] = {...updated[index], [name]: value};
            return updated;
        });
    };

    const AddForm = () => {
        setCertificationData((prev) => {
            const updated = [...prev, emptyCer()];
            setResumeData((resume) => ({...resume, certifications: updated}))
            return updated;
        });ertifi
    }

    const deleteForm = async (index) => {
            const toDelete = certificationData[index];
            const updated = certificationData.filter((_, i) => i !== index);
    
            setCertificationData(updated);
            setResumeData(r => ({ ...r, certifications: updated }));
    
            try {
                if (toDelete?.id) await DeleteCertification(toDelete.id, token);
            } catch (e) {
                console.error("Feiled to delete: ", e);
                setCertificationData(prev => {
                const roll = [...prev];
                roll.splice(index, 0, toDelete);
                return roll;
                });
                setResumeData(r => ({ ...r, certifications: certificationData }));
            }
        };

    const onSubmit = async (e) => {
        e.preventDefault();

        const payload = certificationData.filter((cer) => cer && cer.name?.trim() !== "")
        .map((cer) => ({
            id: cer.id ?? 0,
            name: cer.name,
            description: cer.description,
            date: new Date(cer.date).toISOString(),
            url: cer.url,
            type: cer.type,
            validTo: new Date(cer.validTo).toISOString(),
            status: "InProgress",
        }));

        setIsLoading(true);
        try {
            await Promise.all(payload.map((cer) => {
                if (cer.id !== null && cer.id > 0) {
                    return UpdateCertification(
                        {certificationId: cer.id,
                        certificationData: cer,
                        token: token});
                }else{
                    return AddCertification(cer, token, id)
                }}));
            console.log('Sending certification info:', payload);
            setResumeData(prev => ({ ...prev, certifications: payload }));
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
                            <button type="button" onClick={() => navigate(`/cv/${id}/experience`)} className="previous-btn">Previous stage</button>
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
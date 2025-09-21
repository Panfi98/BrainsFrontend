import { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useResume } from "../../Context/ResumeContext.jsx";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import './CVmaker.css';
import { AddEducation } from "../../Fetcher/PostFetcher/AddEducation.js";
import { GetEducationById } from "../../Fetcher/GetFetcher/GetEducation.js";
import { ProgressBar } from "./CvComponets/Progress-bar.jsx";
import { CvFormEducation } from "./CvComponets/CvFromEducation.jsx";
import { UpdateEducation } from "../../Fetcher/PutFetcher/UpdateEducation.js";
import { DeleteEducation } from "../../Fetcher/DeleteFetcher/DeleteEducation.js";

const emptyEdu = () => ({
  id: 0,
  name: "",
  description: "",
  startDate: "",
  endDate: "",
  degree: "",
  type: "",
  place: "",
  active: "",
  status: "InProgress",
});

const StageEducationInfo = () => {

    const {resumeData, setResumeData} = useResume();
    const [educationData, setEducationData] = useState(
        resumeData.educations.length > 0 ? resumeData.educations : [emptyEdu()]);
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (resumeData.educations?.length > 0) {
            setEducationData(resumeData.educations);
        } else {
            const GetEducation = async () => {
            try {
                const data = await GetEducationById(id, token);
                if (data && data.length > 0) {
                    setEducationData(data);
                }
            } catch (err) {
                console.error(err);
            }
        }
            GetEducation();
        }
        }, [id, token, resumeData.educations]);

    const onChange = (index, e) => {
        const { name, value } = e.target;
        setEducationData(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [name]: value };
            return updated;
        });
        };

    const addForm = () => {
        setEducationData((prev) => {
            const updated = [...prev, emptyEdu()];
            setResumeData((resume) => ({...resume, educations: updated}))
            return updated;
        });
    }

    const deleteForm = async (index) => {
        const toDelete = educationData[index];
        const updated = educationData.filter((_, i) => i !== index);

        setEducationData(updated);
        setResumeData(r => ({ ...r, educations: updated }));

        try {
            if (toDelete?.id) await DeleteProject(toDelete.id, token);
        } catch (e) {
            console.error("Feiled to delete: ", e);
            setEducationData(prev => {
            const roll = [...prev];
            roll.splice(index, 0, toDelete);
            return roll;
            });
            setResumeData(r => ({ ...r, educations: educationData }));
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const payload = educationData.filter((edu) => edu && edu.name?.trim() !== "")
        .map((edu) => ({
            id: edu.id ?? 0,
            name: edu.name,
            type: edu.type,
            startDate: new Date(edu.startDate).toISOString(),
            endDate: new Date(edu.endDate).toISOString(),
            description: edu.description,
            degree: edu.degree,
            place: edu.place,
            active: edu.active,
            status: "InProgress",
        }));

        setIsLoading(true);
        try {
            console.log("Payload before submit:", payload);
            console.log("Raw educationData:", educationData);
            await Promise.all(payload.map((edu) => {
                if (edu.id !== null && edu.id > 0) {
                    return UpdateEducation(
                        {educationId: edu.id,
                        educationData: edu,
                        token: token});
                }else{
                    return AddEducation(edu, token, id)
                }}));
            console.log("Sending education info:", payload);
            setResumeData(prev => ({ ...prev, educations: payload }));
            navigate(`/cv/${id}/projects`);
            console.log("Successfully set education infof");
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
                    <form onSubmit={onSubmit}>
                        {educationData.map((edu, index) => (
                            <CvFormEducation 
                                key={index}
                                index={index} 
                                onChange={onChange}
                                onRemove={() => deleteForm(index)}
                                eduData = {edu}
                            />
                        ))}
                        <button type="button" className="add-form-btn" onClick={addForm}>Add education</button>
                        <div className="button-group">
                            <button type="button" onClick={() => navigate("/cv")} className="previous-btn">Previous stage</button>
                            <button type="submit" className="next-btn" disabled={isLoading}>{isLoading ? "Loading..." : "Next stage"}</button>
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

export default StageEducationInfo;
import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import './CVmaker.css';
import { AddProject } from "../../Fetcher/PostFetcher/AddProject.js";
import { ProgressBar } from "./CvComponets/Progress-bar.jsx";
import { CvFormProject } from "./CvComponets/CvFormProject.jsx";
import { useResume } from "../../Context/ResumeContext.jsx";
import { GetProjectsById } from "../../Fetcher/GetFetcher/GetProjects.js";
import {UpdateProject} from "../../Fetcher/PutFetcher/UpdateProject.js";
import { DeleteProject } from "../../Fetcher/DeleteFetcher/DeleteProject.js";

const emptyProj = () => ({
    id: 0,
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    completed: "",
    status: "InProgress",
});

const StageProjectInfo = () => {

    const {resumeData, setResumeData} = useResume();
    const [projectData, setProjectData] = useState(
        resumeData.projects.length > 0 ? resumeData.projects : [emptyProj()]);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect (() => {
        if (resumeData.projects?.length > 0) {
            setProjectData(resumeData.projects);
        } else {
            const GetProject = async () => {
            try{
                const data = await GetProjectsById(id, token);
                if (data && data.length > 0) {
                    setProjectData(data);
                }
            }catch(err){
                console.error(err)
            }
        }
            GetProject();
        }
    }, [id, token, resumeData.projects]);

    const onChange = (index, e) => {
        const { name, value } = e.target;
        setProjectData(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [name]: value };
            return updated;
        });
    };

    const addForm = () => {
        setProjectData((prev) => {
            const updated = [...prev, emptyProj()];
            setResumeData((resume) => ({...resume, projects: updated}))
            return updated;
        });
    }

    const deleteForm = async (index) => {
            const toDelete = projectData[index];
            const updated = projectData.filter((_, i) => i !== index);
    
            setProjectData(updated);
            setResumeData(r => ({ ...r, projects: updated }));
    
            try {
                if (toDelete?.id) await DeleteProject(toDelete.id, token);
            } catch (e) {
                console.error("Feiled to delete: ", e);
                setProjectData(prev => {
                const roll = [...prev];
                roll.splice(index, 0, toDelete);
                return roll;
                });
                setResumeData(r => ({ ...r, projects: projectData }));
            }
        };

    const onSubmit = async (e) => {
        e.preventDefault();

        const payload = projectData.filter((proj) => proj && proj.name?.trim() !== "")
        .map((proj) => ({
                id: proj.id ?? 0,
                name: proj.name,
                description: proj.description,
                startDate: new Date(proj.startDate).toISOString(),
                endDate: new Date(proj.endDate).toISOString(),
                completed: proj.completed,
                status: "InProgress",
            }));

        setIsLoading(true);
        try {
            await Promise.all(payload.map((proj) => {
                if (proj.id !== null && proj.id > 0) {
                    return UpdateProject(
                        {projectId: proj.id,
                        projectData: proj,
                        token: token});
                }else{
                    return AddProject(proj, token, id)
                }}));
            console.log('Sending project info:', payload);
            setResumeData(prev => ({ ...prev, projects: payload }));
            navigate(`/cv/${id}/skills`);
            console.log('Successfully set project info');
        }catch (error) {
            console.error('Project info error:', error);
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
                    <h2>Stage 3</h2>
                </div>
                <div className="cv-form">
                    <form onSubmit={onSubmit}>
                        {projectData.map((proj, index) => (
                            <CvFormProject
                                key={index}
                                index={index}
                                projData={proj}
                                onChange={onChange}
                                onRemove={() => deleteForm(index)} 
                            />
                        ))}
                        <button type="button" className="add-form-btn" onClick={addForm}>Add project</button>
                        <div className="button-group">
                            <button type="button" onClick={() => navigate(`/cv/${id}/education`)} className="previous-btn">Previous stage</button>
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

export default StageProjectInfo;
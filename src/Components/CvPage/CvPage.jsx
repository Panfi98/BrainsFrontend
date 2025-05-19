import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext.jsx";
import { GetCvById } from "../../Fetcher/GetCv.js";
import html2pdf from 'html2pdf.js';
import './CvPage.css';


const CvPage = () => {
     const [isLoading, setIsLoading] = useState(true);
     const [cvData, setCvData] = useState(null);
     const [error, setError] = useState(null);
     const { id } = useParams();
     const { token } = useAuth();
     const contentRef = useRef();


    useEffect(() => {
        setCvData(null);
        setError(null);
        setIsLoading(true);


        if (!id || !token) {
            console.error("Missing ID or token for fetching CV.");
            setError("Missing required information to load CV.");
            setIsLoading(false);
            return;
        }

        async function fetchResume() {
            try{
                console.log(`Fetching CV data for ID: ${id}`);
                const response = await GetCvById(id, token);
                setCvData(response);
                console.log("Successfully fetched CV data:", response);

            } catch (err) {
                console.error(`Error fetching CV with ID ${id}:`, err);
                setError(err.message || "Failed to fetch CV data.");

            } finally {
                setIsLoading(false);
            }
        }

        fetchResume();
    }, [id, token]);

    const handleDownload = async (e) => {
        try{
            const element = contentRef.current;
            const opt = {
                filename: 'cv.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            await html2pdf().set(opt).from(element).save();
        } catch (error) {
            console.error("Error downloading CV as PDF:", error);
        }
    };        


    if (isLoading) {
        return <div>Loading CV...</div>;
    }


    if (error) {
        return <div>Error loading CV: {error}</div>;
    }


    if (!cvData) {
         return <div>CV not found or unable to load data.</div>;
    }


    return (
        <div className="cv-page">
            <div className="cv-conteiner" ref={contentRef}>
                <div className="cv-left">
                    <div className="personal-info">
                        <img src={cvData.resume.pictureURL} alt="Profile"/>
                        <p>{cvData.resume.email || 'N/A'}</p>
                        <p>{cvData.resume.phoneNumber || 'N/A'}</p>
                        <p>Birthday: {cvData.resume.birthday || 'N/A'}</p>
                        <p>{cvData.resume.address || 'N/A'}</p>
                    </div>
                    <div className="personal-info">
                        <h3>Languages</h3>
                    </div>
                    <div className="personal-info">
                        <h3>Skills</h3>
                            {cvData.infoSkills.map((skill, index) => (
                                <div key={index}>
                                    <p>{skill.name || 'N/A'} ({skill.type || 'N/A'}) - Level: {skill.level || 'N/A'}</p>
                                    {skill.description && <p className="description">Description: {skill.description}</p>}
                                </div>
                            ))}
                    </div>
                </div>
                <div className="main-conteiner">
                    <h1>{cvData.resume.firstName || 'N/A'} {cvData.resume.lastName || 'N/A'}</h1>
                    <p className="summary">About me: {cvData.resume.summary || 'N/A'}</p>
                    {cvData.educations && cvData.educations.length > 0 && (
                        <div className="cv-section">
                            <h3>Education</h3>
                            {cvData.educations.map((edu, index) => (
                                <div key={index}>
                                    <p>Institution: {edu.name || 'N/A'}</p>
                                    <p>Degree: {edu.degree || 'N/A'} ({edu.type || 'N/A'})</p>
                                    <p>Location: {edu.place || 'N/A'}</p>
                                    <p>Description: {edu.description || 'N/A'}</p>
                                    <p>Dates: {edu.startDate || 'N/A'} - {edu.active ? 'Present' : (edu.endDate || 'N/A')}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {cvData.experiences && cvData.experiences.length > 0 && (
                        <div className="cv-section">
                            <h3>Experience</h3>
                            {cvData.experiences.map((exp, index) => (
                                <div key={index}>
                                    <p>Position: {exp.position || 'N/A'} at {exp.organisation || 'N/A'}</p>
                                    <p>Type: {exp.type || 'N/A'}</p>
                                    <p>Description: {exp.description || 'N/A'}</p>
                                    <p>Dates: {exp.startAt || 'N/A'} - {exp.active ? 'Present' : (exp.endedAt || 'N/A')}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {cvData.infoSkills && cvData.infoSkills.length > 0 && (
                        <div className="cv-section">
                            <h3>Skills</h3>
                            {cvData.infoSkills.map((skill, index) => (
                                <div key={index}>
                                    <p>{skill.name || 'N/A'} ({skill.type || 'N/A'}) - Level: {skill.level || 'N/A'}</p>
                                    {skill.description && <p style={{fontSize: '0.9em', color: '#555'}}>Description: {skill.description}</p>}
                                </div>
                            ))}
                        </div>
                    )}

                    {cvData.projects && cvData.projects.length > 0 && (
                        <div className="cv-section">
                            <h3>Projects</h3>
                            {cvData.projects.map((proj, index) => (
                                <div key={index}>
                                    <p>Name: {proj.name || 'N/A'}</p>
                                    <p>Description: {proj.description || 'N/A'}</p>
                                    <p>Dates: {proj.startDate || 'N/A'} - {proj.endDate || 'N/A'}</p>
                                    <p>Status: {proj.complited ? 'Completed' : 'In Progress'}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {cvData.certifications && cvData.certifications.length > 0 && (
                        <div className="cv-section">
                            <h3>Certifications</h3>
                            {cvData.certifications.map((cert, index) => (
                                <div key={index}>
                                    <p>Name: {cert.name || 'N/A'} ({cert.type || 'N/A'})</p>
                                    <p>Date Issued: {cert.date || 'N/A'}</p>
                                    {cert.validTo && <p>Valid Until: {cert.validTo}</p>}
                                    {cert.url && <p>URL: <a href={cert.url} target="_blank" rel="noopener noreferrer">{cert.url}</a></p>}
                                    <p>Description: {cert.description || 'N/A'}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {cvData.references && cvData.references.length > 0 && (
                        <div className="cv-section">
                            <h3>References</h3>
                            {cvData.references.map((ref, index) => (
                                <div key={index}>
                                    <p>Name: {ref.firstName || 'N/A'} {ref.lastName || 'N/A'}</p>
                                    <p>Position: {ref.position || 'N/A'}</p>
                                    <p>Email: {ref.email || 'N/A'}</p>
                                    <p>Phone: {ref.phoneNumber || 'N/A'}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="btns" style={{marginTop: '20px'}}>
                <button className="btn">Edit</button>
                <button className="btn" onClick={handleDownload}>Download</button>
            </div>
        </div>
    );
}

export default CvPage;
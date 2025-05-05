import React, { useEffect } from "react";
import {useState} from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useResume } from "../../Context/ResumeContext.jsx";
import { GetCvById } from "../../Fetcher/GetCv.js";

const CvPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useAuth();
    const { resumeData, setResumeData } = useResume();

    useEffect(() => {
        async function fetchResume() {
            try{
                const response = await GetCvById(resumeData.id, token);
                setResumeData(response);
            } catch (err) {
                BiSolidCommentError(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchResume();
    }, []);

    return(
        <div className ="">
            <div className="Cv-conteiner">
                <div className="Cv">
                    <h2>CV</h2>
                    <p>Name {resume.firstName} {resume.lastName}</p>
                    <p>Email {resumeData.resume.email}</p>
                    <p>Phone number {resumeData.resume.phoneNumber}</p>
                    <p>Birthday {resumeData.resume.birthday}</p>
                    <p>Address {resumeData.resume.address}</p>
                    <p>Picture url {resumeData.resume.pictureURL}</p>
                    <p>Summary {resumeData.resume.summary}</p>
                </div>
                {/* <div className="education">
                    <h2>Education</h2>
                    <p>Name {educations.name}</p>
                    <p>Type {educations.type}</p>
                    <p>Description {educations.description}</p>
                    <p>Degree {educations.degree}</p>
                    <p>Place {educations.place}</p>
                    <p>StartDate {educations.startDate}</p>
                    <p>EndDate {educations.endDate}</p>
                    <p>Active {educations.active}</p>
                </div>
                <div className="experience">
                    <h2>Experience</h2>
                    <p>Name {experiences.name}</p>
                    <p>Organisation {experiences.organisation}</p>
                    <p>Type {experiences.type}</p>
                    <p>Position {experiences.position}</p>
                    <p>Description {experiences.description}</p>
                    <p>Start date {experiences.startAt}</p>
                    <p>Ended at {experiences.endedAt}</p>
                    <p>Active {experiences.active}</p>
                </div>
                <div className="skills">
                    <h2>Skills</h2>
                    <p>Name {infoSkills.name}</p>
                    <p>Descrition {infoSkills.description}</p>
                    <p>Type {infoSkills.type}</p>
                    <p>Level {infoSkills.level}</p>
                </div>
                <div className="project">
                    <h2>Progects</h2>
                    <p>Name {projects.name}</p>
                    <p>Descritpion {projects.description}</p>
                    <p>Starte date {projects.startDate}</p>
                    <p>End date {projects.endDate}</p>
                    <p>Complited {projects.complited}</p>
                </div>
                <div className="certificatin">
                    <h2>Certifications</h2>
                    <p>Name {certifications.name}</p>
                    <p>Description {certifications.description}</p>
                    <p>Date {certifications.date}</p>
                    <p>Url {certifications.url}</p>
                    <p>Type {certifications.type}</p>
                    <p>Valid to {certifications.validTo}</p>
                </div>
                <div className="References">
                    <h2>References</h2>
                    <p>Name {references.firstName} {reference.lastName}</p>
                    <p>Position {references.position}</p>
                    <p>Email {references.email}</p>
                    <p>Phone number {references.phoneNumber}</p>
                </div> */}
            </div>
            <div className="btns">
                <button className="btn">Edit</button>
                <button className="btn">Download</button>
            </div>
        </div>
    )
}

export default CvPage;
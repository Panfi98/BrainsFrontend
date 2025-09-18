import React, {createContext, useContext, useState} from "react";

const ResumeContext = createContext()

export const ResumeProvider = ({children}) => {
    const [resumeData, setResumeData] = useState({
        person: null,
        educations: [],
        projects: [],
        skills: [],
        experiences: [],
        certifications: [],
        references: []
    });

    return(
        <ResumeContext.Provider value={{resumeData, setResumeData}}>
            {children}
        </ResumeContext.Provider>
    )
}

export const useResume = () => useContext(ResumeContext);
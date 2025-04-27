import React, {useState, useContext} from "react";

const ResumeContext = React.createContext()

export function useResume() {
    return useContext(ResumeContext)
}

export function ResumeProvider(props){
    const [resumeData, setResumeData] = useState();

    const value = {
        resumeData,
        setResumeData
    }

    return(
        <ResumeContext.Provider value={value}>{props.children}</ResumeContext.Provider>)
}
import { Navigate, useNavigate } from "react-router-dom"
export function ProgressBar({id}){

    const navigate = useNavigate()
    return(
        <div className="progress-bar">
            <p>CV progress</p>
            <button className="progress-button" onClick={() => navigate("/cv")}>Personal info</button>
            <button className="progress-button" onClick={() => navigate(`/cv/${id}/education`)} disabled={!id}>Education info</button>
            <button className="progress-button" onClick={() => navigate(`/cv/${id}/projects`)} disabled={!id}>Project info</button>
            <button className="progress-button" onClick={() => navigate(`/cv/${id}/skills`)} disabled={!id}>Skills info</button>
            <button className="progress-button" onClick={() => navigate(`/cv/${id}/experience`)} disabled={!id}>Experience info</button>
            <button className="progress-button" onClick={() => navigate(`/cv/${id}/certification`)} disabled={!id}>Certification info</button>
            <button className="progress-button" onClick={() => navigate(`/cv/${id}/reference`)} disabled={!id}>Reference info</button>
        </div>
    )
}
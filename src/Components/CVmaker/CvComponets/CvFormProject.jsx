import TextareaAutosize from "react-textarea-autosize";

const toDateInputValue = (dateString) => {
    if(!dateString) return "";
    const d = new Date(dateString);
    return d.toISOString().split("T")[0];
}

export function CvFormProject ({index, onChange, projData, onRemove}) {
    return(
        <div className="cv-block">
            <h2>Project info {index + 1}</h2>
            <div className="input-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text" 
                    id={`name_${index}`} 
                    name="name" 
                    onChange={onChange}  
                    value={projData.name}
                />
            </div>

            <div className="input-group">
                <label htmlFor={`description_${index}`} >Description:</label>
                <TextareaAutosize 
                    id={`description_${index}`} 
                    name="description" 
                    onChange={onChange} 
                    value={projData.description}
                    minRows={3} maxRows={10}
                />
            </div>

            <div className="input-group">
                <label htmlFor={`startDate_${index}`} >Started at:</label>
                <input
                    type="date"
                    id={`startDate_${index}`} 
                    name="startDate" 
                    onChange={onChange} 
                    value={toDateInputValue(projData.startDate)}
                />
            </div>

            <div className="input-group">
                <label htmlFor={`endDate_${index}`} >Complited at:</label>
                <input 
                    type="date"
                    id={`endDate_${index}`} 
                    name="endDate" 
                    onChange={onChange} 
                    value={toDateInputValue(projData.endDate)}
                />
            </div>

            <div className="input-group">
                <label htmlFor={`completed_${index}`}>Completed:</label>
                <div className="radio-group">
                    <div className="radio-option">
                        <input 
                            type="radio" 
                            id={`completed_${index}`} 
                            name={`completed_${index}`} 
                            value={true}
                            onChange={onChange} 
                        />
                        <label htmlFor={`completed_${index}`}>Completed</label>
                    </div>
                    <div className="radio-option">
                        <input
                            type="radio"
                            id={`non_completed_${index}`} 
                            name={`completed_${index}`}
                            value={false}
                            onChange={onChange} 
                        />
                        <label htmlFor={`non_completed_${index}`} >Non completed</label>
                    </div>
                </div>
            </div>
            <button type="button" className="del-form-btn" onClick={onRemove}>Remove project</button>
        </div>
    )
}
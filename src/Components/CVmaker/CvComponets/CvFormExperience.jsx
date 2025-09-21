import TextareaAutosize from "react-textarea-autosize";

const toDateInputValue = (dateString) => {
    if(!dateString) return "";
    const d = new Date(dateString);
    return d.toISOString().split("T")[0];
}

export function CvFormExperience ({index, onChange, expData, onRemove}) {
    return (
        <div className="cv-block"> 
            <h2>Experience {index + 1}</h2>
            <div className="input-group">
                <label htmlFor={`name_${index}`}>Name:</label>
                <input 
                    type="text" 
                    id={`name_${index}`} 
                    name="name" 
                    onChange={(e) => onChange(index, e)} 
                    value={expData.name}
                />
            </div>

            <div className="input-group">
                <label htmlFor={`organisation_${index}`}>Organisation:</label>
                <input 
                    type="text" 
                    id={`organisation_${index}`} 
                    name="organisation" 
                    onChange={(e) => onChange(index, e)} 
                    value={expData.organisation}
                />
            </div>

            <div className="input-group">
                <label htmlFor={`type_${index}`} >Type:</label>
                <input 
                    type="text"
                    id={`type_${index}`} 
                    name="type" 
                    onChange={(e) => onChange(index, e)} 
                    value={expData.type}
                />
            </div>

            <div className="input-group">
                <label htmlFor={`position_${index}`}>Position:</label>
                <input
                    type="text"
                    id={`position_${index}`} 
                    name="position" 
                    onChange={(e) => onChange(index, e)} 
                    value={expData.position}
                />
            </div>

            <div className="input-group">
                <label htmlFor={`description_${index}`}>Description:</label>
                <TextareaAutosize 
                    id={`description_${index}`} 
                    name="description" 
                    onChange={(e) => onChange(index, e)} 
                    value={expData.description}
                    minRows={3} maxRows={10}
                />
            </div>

            <div className="input-group">
                <label htmlFor={`startedAt_${index}`} >Started at:</label>
                <input 
                    type="date" 
                    id={`startedAt_${index}`} 
                    name="startedAt" 
                    onChange={(e) => onChange(index, e)} 
                    value={toDateInputValue(expData.startedAt)}
                />
            </div>

            <div className="input-group">
                <label htmlFor={`endedAt_${index}`}>Ended at:</label>
                <input 
                    type="date" 
                    id={`endedAt_${index}`} 
                    name="endedAt" 
                    onChange={(e) => onChange(index, e)} 
                    value={toDateInputValue(expData.endedAt)}
                />
            </div>  

            <div className="input-group">
            <label htmlFor="active">Active:</label>
            <div className="radio-group">
                    <div className="radio-option">
                        <input 
                            type="radio" 
                            id={`active_${index}`} 
                            name={`active_${index}`}
                            onChange={(e) => onChange(index, e)} 
                            value={true}
                        />
                        <label htmlFor="active">Active</label>
                    </div>
                    <div className="radio-option">
                        <input 
                            type="radio" 
                            id={`non_active_${index}`} 
                            name={`active_${index}`}
                            onChange={(e) => onChange(index, e)} 
                            value={false}
                        />
                        <label htmlFor="non-active">Not active</label>
                    </div>
                </div>
            </div>
            <button type="button" className="del-form-btn" onClick={onRemove}>Remove education</button>
        </div>
    );
}
import TextareaAutosize from "react-textarea-autosize";
export function CvFormSkills ({index, sklData, onChange, onRemove}) {
    return(
        <div className="cv-block">
            <h2>Skill {index + 1}</h2>
            <div className="input-group">
                <label htmlFor={`name_${index}`}>Name:</label>
                <input 
                    type="text" 
                    id={`name_${index}`} 
                    name="name" 
                    onChange={(e) => onChange(index, e)} 
                    value={sklData.name}    
                />
            </div>

            <div className="input-group">
                <label htmlFor={`description_${index}`} >Description:</label>
                <TextareaAutosize 
                    id={`description_${index}`} 
                    name="description" 
                    onChange={(e) => onChange(index, e)} 
                    value={sklData.description} 
                    minRows={3} maxRows={10}
                />
            </div>

            <div className="input-group">
                <label htmlFor={`type_${index}`}>Type:</label>
                <input 
                    type="text" 
                    id={`type_${index}`} 
                    name="type" 
                    onChange={(e) => onChange(index, e)} 
                    value={sklData.type}  
                />
            </div>

            <div className="input-group">
                <label htmlFor={`level_${index}`} >Level:</label>
                <select 
                    id={`level_${index}`} 
                    name="level" 
                    onChange={(e) => onChange(index, e)} 
                    value={sklData.level}  
                >
                    <option value="0">None</option>
                    <option value="1">Begynner</option>
                    <option value="2">Intermediater</option>
                    <option value="3">Apper Intermidiater</option>
                </select>
            </div>
            <button type="button" className="del-form-btn" onClick={onRemove}>Remove education</button>
        </div>
    );
}
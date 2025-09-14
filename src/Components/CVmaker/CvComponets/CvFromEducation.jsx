export function CvFormEducation ({index, onChange, eduData, onRemove}) {
    return(
        <div className="education-block">
            <h3>Education #{index + 1}</h3>

            <div className="input-group">
                <label htmlFor={`name_${index}`}>Name:</label>
                <input 
                    type="text" 
                    id={`name_${index}`} 
                    name="name" 
                    onChange={(e) => onChange(index, e)} 
                    value={eduData.name}
                />
            </div>

            <div className="input-group">
                <label htmlFor={`description_${index}`}>Description:</label>
                <textarea 
                    id={`description_${index}`} 
                    name="description" 
                    onChange={(e) => onChange(index, e)} 
                    value={eduData.description}
                    required
                />
            </div>

            <div className="input-group">
                <label htmlFor={`startDate_${index}`}>Started at:</label>
                <input 
                    type="date" 
                    id={`startDate_${index}`}
                    name="startDate" 
                    onChange={(e) => onChange(index, e)} 
                    value={eduData.startDate}
                    required
                />
            </div>

            <div className="input-group">
                <label htmlFor={`endDate_${index}`}>Ended at:</label>
                <input 
                    type="date" 
                    id={`endDate_${index}`} 
                    name="endDate" 
                    onChange={(e) => onChange(index, e)}
                    value={eduData.endDate}
                    required
                />
            </div>

            <div className="input-group">
                <label htmlFor={`degree_${index}`}>Degree:</label>
                <select 
                    id={`degree_${index}`} 
                    name="degree" 
                    onChange={(e) => onChange(index, e)}
                    value={eduData.degree}
                    required
                > 
                    <option value="none">None</option>
                    <option value="bachelor">Bachelor</option>
                    <option value="master">Master</option>
                    <option value="phd">PhD</option>
                </select>
            </div>

            <div className="input-group">
                <label htmlFor={`type_${index}`}>Type:</label>
                <select 
                    id={`type_${index}`} 
                    name="type" 
                    onChange={(e) => onChange(index, e)}
                    value={eduData.type}
                    required
                >
                    <option value="none">None</option>
                    <option value="economist">Economist</option>
                    <option value="programist">Programist</option>
                    <option value="jurist">Jurist</option>
                </select>
            </div>

            <div className="input-group">
                <label htmlFor={`place_${index}`}>Place:</label>
                <input 
                    type="text" 
                    id={`place_${index}`} 
                    name="place" 
                    onChange={(e) => onChange(index, e)}
                    value={eduData.place}
                    required
                />
            </div>
        
            <div className="input-group">
                <label htmlFor={`active_${index}`}>Active:</label>
                <div className="radio-group">
                    <div className="radio-option">
                        <input 
                            type="radio" 
                            id={`active_${index}`} 
                            name="active" 
                            value={true}
                            onChange={(e) => onChange(index, e)}
                        />
                        <label htmlFor={`active_${index}`}>Active</label>
                    </div>
                    <div className="radio-option">
                        <input 
                            type="radio" 
                            id={`non_active_${index}`} 
                            name="active" 
                            value={false}
                            onChange={(e) => onChange(index, e)}
                        />
                        <label htmlFor={`non_active_${index}`}>Not active</label>
                    </div>
                    <button type="button" className="del-form-btn" onClick={onRemove}>Remove education</button>
                </div>
            </div>
        </div>
    )
}
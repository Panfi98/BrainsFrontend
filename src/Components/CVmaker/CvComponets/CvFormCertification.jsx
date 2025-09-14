export function CvFormCertification ({index, onChange, cerData, onRemove}) {
    return(
        <div>
            <h2>Certification info {index + 1}</h2>
            <div className="input-group">
                <label htmlFor={`name_${index}`}>Name:</label>
                <input 
                    type="text" 
                    id={`name_${index}`} 
                    name="name" 
                    onChange={(e) => onChange(index, e)} 
                    value={cerData.name}
                />
            </div>

            <div className="input-group">
                <label htmlFor={`description_${index}`}>Description:</label>
                <textarea 
                    id={`description_${index}`} 
                    name="description" 
                    onChange={(e) => onChange(index, e)} 
                    value={cerData.description}
                />
            </div>

            <div className="input-group">
                <label htmlFor={`date_${index}`}>Date:</label>
                <input 
                    type="date" 
                    id={`date_${index}`} 
                    name="date" 
                    onChange={(e) => onChange(index, e)} 
                    value={cerData.date}
                />
            </div>

            <div className="input-group">
                <label htmlFor={`url_${index}`}>Url:</label>
                <input 
                    type="url" 
                    id={`url_${index}`} 
                    name="url" 
                    onChange={(e) => onChange(index, e)} 
                    value={cerData.url}
                />
            </div>

            <div className="input-group">
                <label htmlFor={`type_${index}`} >Type:</label>
                <input 
                    type="text"
                    id={`type_${index}`} 
                    name="type" 
                    onChange={(e) => onChange(index, e)} 
                    value={cerData.type}
                />
            </div>

            <div className="input-group">
                <label htmlFor={`validTo_${index}`}>Valid to:</label>
                <input 
                    type="date" 
                    id={`validTo_${index}`} 
                    name="validTo" 
                    onChange={(e) => onChange(index, e)} 
                    value={cerData.validTo}
                />
            </div>
            <button type="button" className="del-form-btn" onClick={onRemove}>Remove education</button>
        </div>
    )
}
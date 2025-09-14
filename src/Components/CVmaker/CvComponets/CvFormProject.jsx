export function CvFormProject ({index, onChange, projData}) {
    return(
        <form>
            <h2>Project info {index + 1}</h2>
            <div className="input-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text" 
                    id={`name_${index}`} 
                    name="name" 
                    onChange={(e) => onChange(index, e)} 
                    value={projData.name}
                />
            </div>

            <div className="input-group">
                <label htmlFor={`description_${index}`} >Description:</label>
                <textarea 
                    id={`description_${index}`} 
                    name="description" 
                    onChange={(e) => onChange(index, e)} 
                    value={projData.description}
                />
            </div>

            <div className="input-group">
                <label htmlFor={`startDate_${index}`} >Started at:</label>
                <input
                    type="date"
                    id={`startDate_${index}`} 
                    name="startDate" 
                    onChange={(e) => onChange(index, e)} 
                    value={projData.startDate}
                />
            </div>

            <div className="input-group">
                <label htmlFor={`endDate_${index}`} >Complited at:</label>
                <input 
                    type="date"
                    id={`endDate_${index}`} 
                    name="endDate" 
                    onChange={(e) => onChange(index, e)} 
                    value={projData.endDate}
                />
            </div>

            <div className="input-group">
                <label htmlFor={`completed_${index}`}>Completed:</label>
                <div className="radio-group">
                    <div className="radio-option">
                        <input 
                            type="radio" 
                            id={`completed_${index}`} 
                            name="active" 
                            value={true}
                            onChange={(e) => onChange(index, e)}
                        />
                        <label htmlFor={`completed_${index}`}>Completed</label>
                    </div>
                    <div className="radio-option">
                        <input
                            type="radio"
                            id={`non_completed_${index}`} 
                            name="active" 
                            value={false}
                            onChange={(e) => onChange(index, e)}
                        />
                        <label htmlFor={`non_completed_${index}`} >Non completed</label>
                    </div>
                </div>
            </div>
        </form>
    )
}
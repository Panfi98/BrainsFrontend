export function CvFormEducation ({index, onChange, edu}) {
    return(
            <form>
                <h2>Education info {index + 1}</h2>
                <div className="input-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" onChange={onChange} />
                </div>

                <div className="input-group">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" onChange={onChange} />
                </div>

                <div className="input-group">
                    <label htmlFor="startDate">Started at:</label>
                    <input type="date" id="startDate" name="startDate" onChange={onChange} />
                </div>

                <div className="input-group">
                    <label htmlFor="endDate">Ended at:</label>
                    <input type="date" id="endDate" name="endDate" onChange={onChange} />
                </div>

                <div className="input-group">
                    <label htmlFor="degree">Degree:</label>
                    <select id="degree" name="degree" onChange={onChange}> 
                        <option value="none">None</option>
                        <option value="bachelor">Bachelor</option>
                        <option value="master">Master</option>
                        <option value="phd">PhD</option>
                    </select>
                </div>

                <div className="input-group">
                    <label htmlFor="type">Type:</label>
                    <select id="type" name="type" onChange={onChange}>
                        <option value="none">None</option>
                        <option value="economist">Economist</option>
                        <option value="programist">Programist</option>
                        <option value="jurist">Jurist</option>
                    </select>
                </div>

                <div className="input-group">
                    <label htmlFor="place">Place:</label>
                    <input type="text" id="place" name="place" onChange={onChange}></input>
                </div>
            
                <div className="input-group">
                    <label htmlFor="active">Active:</label>
                    <div className="radio-group">
                        <div className="radio-option">
                            <input type="radio" id="active" name="active" value="true" onChange={onChange} />
                            <label htmlFor="active">Active</label>
                        </div>
                        <div className="radio-option">
                            <input type="radio" id="non active" name="non active" value="false" onChange={onChange} />
                            <label htmlFor="non-active">Not active</label>
                        </div>
                    </div>
                </div>
            </form>
    )
}
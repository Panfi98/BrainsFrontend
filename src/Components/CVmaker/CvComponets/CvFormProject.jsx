export function CvFormProject ({index, onChange}) {
    return(
        <form>
            <h2>Project info</h2>
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
                <label htmlFor="endDate">Complited at:</label>
                <input type="date" id="endDate" name="endDate" onChange={onChange} />
            </div>

            <div className="input-group">
                <label htmlFor="completed">Completed:</label>
                <div className="radio-group">
                    <div className="radio-option">
                        <input type="radio" id="completed" name="completed" value="true" onChange={onChange} />
                        <label htmlFor="completed">Completed</label>
                    </div>
                    <div className="radio-option">
                        <input type="radio" id="non completed" name="completed" value="false" onChange={onChange} />
                        <label htmlFor="non-completed">Non completed</label>
                    </div>
                </div>
            </div>
        </form>
    )
}
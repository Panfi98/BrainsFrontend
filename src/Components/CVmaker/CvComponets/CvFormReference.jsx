export function CvFormReference({ index, refData, onChange, onRemove }) {
  return (
    <div className="cv-block">
      <div>
        <h2>Reference {index + 1}</h2>
      </div>

      <div className="input-group">
        <label htmlFor={`firstName_${index}`}>First name:</label>
        <input
          type="text"
          id={`firstName_${index}`}
          name="firstName"
          onChange={(e) => onChange(index, e)}
          value={refData.firstName} 
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor={`lastName_${index}`}>Last name:</label>
        <input
          type="text"
          id={`lastName_${index}`}
          name="lastName"
          onChange={(e) => onChange(index, e)}
          value={refData.lastName}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor={`position_${index}`}>Position:</label>
        <input
          id={`position_${index}`}
          name="position"
          onChange={(e) => onChange(index, e)}
          value={refData.position} 
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor={`email_${index}`}>Email:</label>
        <input
          type="email"
          id={`email_${index}`}
          name="email"
          onChange={(e) => onChange(index, e)}
          value={refData.email} 
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor={`phoneNumber_${index}`}>Phone:</label>
        <input
          type="tel"
          id={`phoneNumber_${index}`}
          name="phoneNumber"
          onChange={(e) => onChange(index, e)}
          value={refData.phoneNumber} 
          required
        />
      </div>
      <button type="button" className="del-form-btn" onClick={onRemove}>Remove education</button>
    </div>
  );
}

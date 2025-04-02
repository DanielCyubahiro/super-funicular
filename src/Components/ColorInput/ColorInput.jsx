const ColorInput = ({id, label, value, error, onChange}) => (
    <label htmlFor={id}>
      {label}
      <div className="color-input-group">
        <input
            value={value}
            id={id}
            type="text"
            onChange={(e) => onChange(e.target.value)}
        />
        <input
            value={value}
            type="color"
            onChange={(e) => onChange(e.target.value)}
        />
      </div>
      {error && (
          <span className="error-message">
        {error}
      </span>
      )}
    </label>
);

export default ColorInput;
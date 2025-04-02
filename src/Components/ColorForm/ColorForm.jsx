import './ColorForm.css';
import {useState} from 'react';
import {isValidHex} from '../../lib/utls.js';
import ColorInput from '../ColorInput/ColorInput.jsx';

const ColorForm = () => {
  const [color, setColor] = useState('#000000');
  const [contrastText, setContrastText] = useState('#fff');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState({
    color: '',
    contrastText: '',
  });

  const isFormValid = !errors.color && !errors.contrastText && role.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      // Submit logic here
      console.log({color, contrastText, role});
    }
  };

  const handleChangeColor = (value, source) => {
    const isValid = isValidHex(value);
    const errorMessage = isValid ? '' : 'Invalid hex color format';

    if (source === 'color') {
      setColor(value);
      setErrors((prev) => ({...prev, color: errorMessage}));
    } else if (source === 'contrastText') {
      setContrastText(value);
      setErrors((prev) => ({...prev, contrastText: errorMessage}));
    }
  };

  return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="role">
          Role
          <input
              required
              value={role}
              id="role"
              type="text"
              onChange={(e) => setRole(e.target.value)}
          />
        </label>

        <ColorInput
            id="hex"
            label="Hex"
            value={color}
            error={errors.color}
            onChange={(value) => handleChangeColor(value, 'color')}
        />

        <ColorInput
            id="contrastText"
            label="Contrast Text"
            value={contrastText}
            error={errors.contrastText}
            onChange={(value) => handleChangeColor(value, 'contrastText')}
        />

        <button type="submit" disabled={!isFormValid}>
          Add Color
        </button>
      </form>
  );
};

export default ColorForm;
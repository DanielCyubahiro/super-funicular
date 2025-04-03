import './ColorForm.css';
import {useState} from 'react';
import {checkContrast, isValidHex} from '../../lib/utls.js';
import ColorInput from '../ColorInput/ColorInput.jsx';

const ColorForm = ({
  onAddOrUpdateColor,
  colorCard = null,
  setShowEditForm = null,
}) => {
  const [color, setColor] = useState(colorCard ? colorCard.hex : '#000000');
  const [contrastText, setContrastText] = useState(
      colorCard ? colorCard.contrastText : '#ffffff');
  const [role, setRole] = useState(
      colorCard ? colorCard.role : 'Secondary main');

  const [errors, setErrors] = useState({
    color: '',
    contrastText: '',
  });

  const isFormValid = !errors.color && !errors.contrastText && role.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      colorCard
          ? onAddOrUpdateColor({
            id: colorCard.id,
            hex: color,
            contrastText,
            role,
            contrastScore: await checkContrast(color, contrastText),
          })
          : onAddOrUpdateColor({
            hex: color,
            contrastText,
            role,
            contrastScore: await checkContrast(color, contrastText),
          });

      //Hide form
      if (setShowEditForm) {
        setShowEditForm(false);
      }
    }
  };

  const handleChangeColor = async (value, source) => {
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
          {colorCard ? 'Update Color' : 'Add Color'}
        </button>
        {
            setShowEditForm && (
                <button onClick={() => setShowEditForm && setShowEditForm(false)}>
                  Cancel Update
                </button>
            )
        }
      </form>
  );
};

export default ColorForm;
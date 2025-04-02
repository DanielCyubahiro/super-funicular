import './ColorForm.css';
import {useState} from 'react';
import {isValidHex} from '../../lib/utls.js';

const ColorForm = () => {
  const [color, setColor] = useState('#000000');
  const [contrastText, setContrastText] = useState('#fff');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState({
    color: '',
    contrastText: '',
  });

  const handleSumbit = (e) => {
    e.preventDefault();
  };
  const handleChangeColor = (value, source) => {
    if (source === 'color') {
      setColor(value);

      //Validate hex value
      !isValidHex(value) ? setErrors(
              prevState => ({...prevState, color: 'Invalid hex color format'}))
          :
          setErrors(prevState => ({...prevState, color: ''}));
    } else if (source === 'contrast-text') {
      setContrastText(value);

      //Validate hex value
      !isValidHex(value) ? setErrors(
              prevState => ({
                ...prevState,
                contrastText: 'Invalid hex color format',
              }))
          :
          setErrors(prevState => ({...prevState, contrastText: ''}));
    }
  };
  return (
      <form onSubmit={handleSumbit}>
        <label htmlFor={'role'}>
          Role
          <input
              required
              value={role}
              id={'role'}
              type="text"
              onChange={(e) => setRole(e.target.value)}
          />
        </label>
        <label htmlFor={'hex'}>
          Hex
          <div className={'color-input-group'}>
            <input
                value={color}
                id={'hex'}
                type="text"
                onChange={(e) => handleChangeColor(e.target.value, 'color')}
            />
            <input
                value={color}
                type="color"
                onChange={(e) => handleChangeColor(e.target.value, 'color')}
            />
          </div>
          {errors.color &&
              <span
                  className="error-message">
                {errors.color}
              </span>
          }
        </label>
        <label htmlFor={'contrastText'}>
          Contrast Text
          <div className={'color-input-group'}>
            <input
                value={contrastText}
                id={'contrastText'}
                type="text"
                onChange={(e) => handleChangeColor(e.target.value,
                    'contrast-text')}
            />
            <input
                value={contrastText}
                type="color"
                onChange={(e) => handleChangeColor(e.target.value,
                    'contrast-text')}
            />
          </div>
          {errors.contrastText &&
              <span
                  className="error-message">
                {errors.contrastText}
              </span>
          }
        </label>
        <button
            type="submit"
            disabled={Object.values(errors).some(error => error)}>
          Add Color
        </button>
      </form>
  );
};
export default ColorForm;
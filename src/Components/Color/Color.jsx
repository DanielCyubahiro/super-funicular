import './Color.css';
import {useEffect, useState} from 'react';
import ColorForm from '../ColorForm/ColorForm.jsx';
import CopyToClipboard from '../CopyToClipboard/CopyToClipboard.jsx';
import {checkContrast} from '../../lib/utls.js';

export default function Color({color, onDelete, onEdit}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [contrastScore, setContrastScore] = useState(color.contrastScore);

  useEffect(() => {
    void (async () => {
      setContrastScore(await checkContrast(color.hex, color.contrastText));
    })()
  }, [color])
  return (
      <div
          className="color-card"
          style={{
            background: color.hex,
            color: color.contrastText,
          }}
      >
        <h3 className="color-card-highlight">{color.hex}</h3>
        <CopyToClipboard text={color.hex}/>
        <h4>{color.role}</h4>
        <p>contrast: {color.contrastText}</p>
        {
            contrastScore &&
            <p
                style={{
                  background: contrastScore === 'Yup'
                      ? 'green'
                      : contrastScore ===
                      'Kinda' ? 'orange' : 'red',
                  width: 'fit-content',
                  color: 'white',
                }}
            >
              Overall Contrast Score: {contrastScore}
            </p>
        }
        {
            showConfirm && (
                <>
                  <h4 className="color-card-highlight">really delete?</h4>
                  <button onClick={() => setShowConfirm(false)}>
                    Cancel
                  </button>
                </>
            )
        }
        <button
            onClick={showConfirm ? onDelete : () => setShowConfirm(true)}
        >
          Delete
        </button>
        {!showConfirm && (<button
            onClick={() => setShowEditForm(true)}
        >
          Edit
        </button>)}
        {showEditForm &&
            <ColorForm onAddOrUpdateColor={onEdit} colorCard={color}
                       setShowEditForm={setShowEditForm}/>}
      </div>
  );
}

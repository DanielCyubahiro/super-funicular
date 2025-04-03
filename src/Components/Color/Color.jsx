import './Color.css';
import {useState} from 'react';
import ColorForm from '../ColorForm/ColorForm.jsx';
import CopyToClipboard from '../CopyToClipboard/CopyToClipboard.jsx';

export default function Color({color, onDelete, onEdit}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
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
            color.contrastScore &&
            <p
                style={{
                  background: color.contrastScore === 'Yup' ? 'green' : color.contrastScore === 'Kinda' ? 'orange' : 'red',
                  width:'fit-content',
                  color: 'white'
                }}
            >
              Overall Contrast Score: {color.contrastScore}
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

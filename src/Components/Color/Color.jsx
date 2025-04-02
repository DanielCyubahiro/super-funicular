import './Color.css';
import {useState} from 'react';

export default function Color({color, onDelete}) {
  const [showConfirm, setShowConfirm] = useState(false);
  return (
      <div
          className="color-card"
          style={{
            background: color.hex,
            color: color.contrastText,
          }}
      >
        <h3 className="color-card-headline">{color.hex}</h3>
        <h4>{color.role}</h4>
        <p>contrast: {color.contrastText}</p>
        {
            showConfirm && (
                <>
                  <h4 className="color-card-headline">really delete?</h4>
                  <button onClick={() => setShowConfirm(false)}>
                    Cancel
                  </button>
                </>
            )
        }
        <button
            onClick={showConfirm ? onDelete : () => setShowConfirm(true)}>
          Delete
        </button>
      </div>
  );
}

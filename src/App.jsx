import {initialColors} from './lib/colors';
import Color from './Components/Color/Color';
import './App.css';
import ColorForm from './Components/ColorForm/ColorForm.jsx';
import {useState} from 'react';
import {uid} from 'uid';

function App() {

  const [colors, setColors] = useState(initialColors);

  const handleAddNewColor = (newColor) => {
    setColors([{id: uid(), ...newColor}, ...colors]);
  }
  return (
      <>
        <h1>Theme Creator</h1>
        <ColorForm
            onAddNewColor={handleAddNewColor}
        />
        {colors.map((color) => {
          return <Color key={color.id} color={color}/>;
        })}
      </>
  );
}

export default App;

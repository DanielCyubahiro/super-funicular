import {initialColors} from './lib/colors';
import Color from './Components/Color/Color';
import './App.css';
import ColorForm from './Components/ColorForm/ColorForm.jsx';
import {useState} from 'react';
import {uid} from 'uid';

function App() {

  const [colors, setColors] = useState(initialColors);

  const handleAddOrUpdateColor = (color) => {
    'id' in color
        ? setColors(colors.map(c => c.id === color.id ? color : c)) // Update color
        : setColors([{id: uid(), ...color}, ...colors]); // New color

  };

  const handleDelete = (colorId) => {
    setColors(colors.filter(color => color.id !== colorId));
  };
  return (
      <>
        <h1>Theme Creator</h1>
        <ColorForm onAddNewColor={handleAddOrUpdateColor}/>
        {
          colors.length ? colors.map((color) => {
                return <Color
                    key={color.id}
                    color={color}
                    onDelete={() => handleDelete(color.id)}
                    onEdit={handleAddOrUpdateColor}
                />;
              },
          ) : <p>No colors... start by adding one!</p>
        }
      </>
  );
}

export default App;

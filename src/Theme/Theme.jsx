import ColorForm from '../Components/ColorForm/ColorForm.jsx';
import Color from '../Components/Color/Color.jsx';
import useLocalStorageState from 'use-local-storage-state';
import {uid} from 'uid';
import {useEffect} from 'react';

const Theme = ({colorPalette}) => {
  const [colors, setColors] = useLocalStorageState('colors',
      {
        defaultValue: colorPalette,
      });

  useEffect(() => {
    setColors(colorPalette);
  }, [colorPalette, setColors]);

  const handleAddOrUpdateColor = (color) => {
    'id' in color
        ? setColors(colors.map(c => c.id === color.id ? color : c)) // Update color
        : setColors([{id: uid(), ...color}, ...colors]); // New color
  };

  const handleDelete = (colorId) => {
    setColors(colors.filter(color => color.id !== colorId));
  };
  return(
      <>
        <ColorForm onAddOrUpdateColor={handleAddOrUpdateColor}/>
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
  )
}

export default Theme
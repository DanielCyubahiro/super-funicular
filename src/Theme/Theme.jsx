import ColorForm from '../Components/ColorForm/ColorForm.jsx';
import Color from '../Components/Color/Color.jsx';
import {uid} from 'uid';

const Theme = ({selectedTheme, setSelectedTheme}) => {

  const handleAddOrUpdateColor = (color) => {
    'id' in color
        ? setSelectedTheme({
          ...selectedTheme,
          colors: selectedTheme.colors.map(c => c.id === color.id ? color : c),
        }) // Update color
        : setSelectedTheme({
          ...selectedTheme,
          colors: [{id: uid(), ...color}, ...selectedTheme.colors],
        }); // New color
  };

  const handleDelete = (colorId) => {
    setSelectedTheme({
      ...selectedTheme,
      colors: selectedTheme.colors.filter(color => color.id !== colorId),
    });
  };

  return (
      <>
        <ColorForm onAddOrUpdateColor={handleAddOrUpdateColor}/>
        {
          selectedTheme.colors.length ? selectedTheme.colors.map((color) => {
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
};

export default Theme;
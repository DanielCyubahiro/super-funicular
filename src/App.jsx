import './App.css';
import Theme from './Theme/Theme.jsx';
import {initialColors, initialThemes} from './lib/colors.js';
import {useState} from 'react';
import useLocalStorageState from 'use-local-storage-state';

function App() {
  const [themes, setThemes] = useLocalStorageState('themes',
      {
        defaultValue: initialThemes,
      });
  const [selectedThemeColors, setSelectedThemeColors] = useState(initialColors);

  const handleChangeTheme = (e) => {
    const selectedTheme = initialThemes.find(
        (theme) => theme.id === e.target.value);
    selectedTheme ? setSelectedThemeColors(selectedTheme.colors) : null;
  };
  return (
      <>
        <h1>Theme Creator</h1>
        <select
            onChange={handleChangeTheme}
        >
          {
            themes.map((theme) =>
                <option
                    key={theme.id}
                    value={theme.id}
                >
                  {theme.name}
                </option>,
            )
          }
        </select>
        <Theme colorPalette={selectedThemeColors}/>
      </>
  );
}

export default App;

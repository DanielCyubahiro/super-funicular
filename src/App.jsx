import './App.css';
import Theme from './Theme/Theme.jsx';
import {initialThemes} from './lib/colors.js';
import {useState} from 'react';
import useLocalStorageState from 'use-local-storage-state';

function App() {
  const [themes, setThemes] = useLocalStorageState('themes',
      {
        defaultValue: initialThemes,
      });
  const [selectedTheme, setSelectedTheme] = useState(initialThemes.find(
      (theme) => theme.name === 'Default Theme'));

  const handleChangeTheme = (e) => {
    setSelectedTheme(
        themes.find((theme) => theme.id === e.target.value));
  };

  const updateThemes = (theme) => {
    setSelectedTheme(theme);
    setThemes(themes.map((t) => t.id === theme.id ? theme : t));
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
        <Theme
            selectedTheme={selectedTheme}
            setSelectedTheme={updateThemes}
        />
      </>
  );
}

export default App;

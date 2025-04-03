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

  const [showEdit, setShowEdit] = useState(false);
  const [selectedThemeName, setSelectedThemeName] = useState(
      selectedTheme.name);

  const handleChangeTheme = (e) => {
    setSelectedTheme(
        themes.find((theme) => theme.id === e.target.value));
  };

  const updateThemes = (theme) => {
    setSelectedTheme(theme);
    setThemes(themes.map((t) => t.id === theme.id ? theme : t));
  };

  const handleEditThemeName = () => {
    setSelectedTheme({...selectedTheme, name: selectedThemeName});
    setThemes(themes.map((t) => t.id === selectedTheme.id
        ? {...t, name: selectedThemeName}
        : t));
    setShowEdit(false);
  };

  return (
      <>
        <h1>Theme Creator</h1>
        {!showEdit && (
            <>
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
              <button
                  onClick={() => setShowEdit(true)}
              >
                Edit
              </button>
            </>
        )}
        {showEdit && (
            <>
              <input type="text" value={selectedThemeName}
                     onChange={(e) => setSelectedThemeName(e.target.value)}/>
              <button
                  onClick={handleEditThemeName}
              >
                Update
              </button>
              <button
                  onClick={() => {
                    setShowEdit(false);
                    setSelectedThemeName(selectedTheme.name);
                  }}
              >
                Cancel
              </button>
            </>
        )}

        <Theme
            selectedTheme={selectedTheme}
            setSelectedTheme={updateThemes}
        />
      </>
  );
}

export default App;

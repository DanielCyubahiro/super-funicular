import './App.css';
import Theme from './Theme/Theme.jsx';
import {initialThemes} from './lib/colors.js';
import {useState} from 'react';
import useLocalStorageState from 'use-local-storage-state';
import {uid} from 'uid';

function App() {
  const [themes, setThemes] = useLocalStorageState('themes',
      {defaultValue: initialThemes});
  const [selectedTheme, setSelectedTheme] = useState(initialThemes.find(
      (theme) => theme.name === 'Default Theme'));

  const [editMode, setEditMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [addMode, setAddMode] = useState(false);

  const [selectedThemeName, setSelectedThemeName] = useState(
      selectedTheme.name);

  const handleChangeSelectedTheme = (e) => {
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
    addMode ? setAddMode(false) : setEditMode(false);
  };

  const handleDeleteTheme = () => {
    setThemes(themes.filter((t) => t.id !== selectedTheme.id));
    setSelectedTheme(
        initialThemes.find((theme) => theme.name === 'Default Theme'));
    setShowDeleteConfirm(false);
  };

  return (
      <>
        <h1>Theme Creator</h1>
        {!editMode && !addMode && (
            <>
              {!showDeleteConfirm && (
                  <>
                    <select
                        onChange={handleChangeSelectedTheme}
                        value={selectedTheme.id}
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
                        onClick={() => {
                          setAddMode(true);
                          const newTheme = {
                            id: uid(),
                            name: '',
                            colors: [],
                          };
                          setSelectedTheme(newTheme);
                          setThemes([...themes, newTheme]);
                        }}
                    >
                      Add
                    </button>
                    <button
                        onClick={() => setEditMode(true)}
                        disabled={selectedTheme.name === 'Default Theme'}
                    >
                      Edit
                    </button>
                  </>
              )}
              <button
                  onClick={showDeleteConfirm
                      ? handleDeleteTheme
                      : () => setShowDeleteConfirm(true)
                  }
                  disabled={selectedTheme.name === 'Default Theme'}

              >
                {showDeleteConfirm ? 'Really Delete' : 'Delete'}
              </button>
              {showDeleteConfirm && (
                  <button
                      onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </button>
              )}
            </>
        )}
        {(editMode || addMode) && (
            <>
              {addMode ? <input
                  type="text"
                  onChange={(e) => setSelectedThemeName(e.target.value)}
              /> : <input
                  type="text"
                  value={selectedThemeName}
                  onChange={(e) => setSelectedThemeName(e.target.value)}
              />}
              <button
                  onClick={handleEditThemeName}
              >
                {addMode ? 'Save' : 'Update'}
              </button>
              <button
                  onClick={() => {
                    addMode ? setAddMode(false) : setEditMode(false);
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

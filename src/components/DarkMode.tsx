import { useState } from 'react';
import { MoonIcon, SunIcon } from './Icons';

const DarkMode = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches),
  );

  return (
    <button
      data-testid="dark-mode-button"
      className="btn-secondary rounded-lg border p-2"
      title={darkMode ? 'Toggle dark mode' : 'Toggle light mode'}
      onClick={() => {
        if (darkMode) {
          document.documentElement.classList.remove('dark');
          localStorage.theme = 'light';
        } else {
          document.documentElement.classList.add('dark');
          localStorage.theme = 'dark';
        }
        setDarkMode(!darkMode);
      }}
    >
      {darkMode ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

export default DarkMode;

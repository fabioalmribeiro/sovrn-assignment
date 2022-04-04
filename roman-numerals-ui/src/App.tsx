import React from 'react';
import { useState } from 'react';
import AppContext, { AppContextProps } from './App.context';

import './App.scss';
import NumeralToggle from './components/NumeralToggle/NumeralToggle';

function App() {
  const [mode, setMode] = useState<AppContextProps['mode']>('roman');

  const context = { mode, setMode };

  return (
    <AppContext.Provider value={ context }>
      <div className="app">
        <h1>Roman Numerals Converter</h1>

        <NumeralToggle />

      </div>
    </AppContext.Provider>
  );
}

export default App;

import React from 'react';
import { useState } from 'react';
import AppContext, { AppContextProps } from './App.context';

import './App.scss';
import NumeralToggle from './components/NumeralToggle/NumeralToggle';

function App() {
  const [type, setType] = useState<AppContextProps['type']>('roman');

  const context = { type, setType };

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

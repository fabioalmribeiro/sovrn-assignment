import React from 'react';

import './App.scss';
import NumeralToggle from './components/NumeralToggle/NumeralToggle';

function App() {
  return (
    <div className="app">
      <h1>Roman Numerals Converter</h1>

      <NumeralToggle />
    </div>
  );
}

export default App;

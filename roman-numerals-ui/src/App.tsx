import React from 'react';

import './App.scss';
import NumeralConverter from './components/NumeralConverter/NumeralConverter';

function App() {
  return (
    <div className="app">
      <h1>Roman Numerals Converter</h1>

      <NumeralConverter />
    </div>
  );
}

export default App;

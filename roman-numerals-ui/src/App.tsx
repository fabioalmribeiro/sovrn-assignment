import React from 'react';

import './App.scss';
import NumeralConverter from './components/NumeralConverter/NumeralConverter';
import NumeralsHistory from './components/NumeralsHistory/NumeralsHistory';

function App() {
  return (
    <div className="app">
      <h1>Roman Numerals Converter</h1>

      <NumeralConverter />
      <NumeralsHistory />
    </div>
  );
}

export default App;

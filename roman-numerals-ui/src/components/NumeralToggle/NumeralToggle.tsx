import React, { useContext } from 'react';
import { Switch } from '@mui/material';

import './NumeralToggle.scss';
import AppContext from 'src/App.context';

function NumeralToggle() {
  const { type, setType } = useContext(AppContext);
  const onUpdateMode = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setType(checked ? 'arabic' : 'roman');
  };

  return (
    <div className="numeral-toggle">
      <span className="numeral-toggle__label">Roman</span>
      <Switch
        className="numeral-toggle__switch"
        checked={ type === 'arabic' }
        onChange={ onUpdateMode }
      />
      <span className="numeral-toggle__label">Arabic</span>
    </div>
  );
}

export default NumeralToggle;

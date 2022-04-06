import React, { useState, useCallback, useEffect } from 'react';
import { TextField, IconButton } from '@material-ui/core';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import _ from 'lodash';

import './NumeralConverter.scss';
import numeralsAPI from 'src/api/api';
import apiUrls, { replaceUrl } from 'src/api/api-urls';
import APIError from 'src/interfaces/APIError';

function NumeralConverter() {
  const [value, setValue] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [fromRoman, setFromRoman] = useState<boolean>(true);

  const debouncedOnChange = useCallback(_.debounce(async (value: string) => {
    if (value === '') return;

    try {
      const response = await numeralsAPI.get(replaceUrl(apiUrls.numeral, { type: fromRoman ? 'arabic' : 'roman', inputValue: _.upperCase(value) }));
      if (response && response.status === 200 && response.data.results) {
        setResult(response.data.results.convertedValue);
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage((error as APIError).response.data?.message ?? '');
    }
  }, 500), [fromRoman]);

  const triggerDebounce = (value) => {
    setErrorMessage('');
    setResult('');
    debouncedOnChange(value);
  };

  const onUpdateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    triggerDebounce(e.target.value);
  };

  const onUpdateType = () => {
    setFromRoman(!fromRoman);
  };

  useEffect(() => {
    triggerDebounce(value);
  }, [fromRoman]);

  return (
    <div className="numeral-converter">
      <div className="numeral-converter__group">
        <TextField
          className="numeral-converter__input"
          variant="outlined"
          label="Value"
          value={ value }
          onChange={ onUpdateValue }
          error={ errorMessage !== '' }
          helperText={ errorMessage || ' ' }
          data-testid="value-input"
        />

        <div className="numeral-converter__toggle">
          <TextField
            className="numeral-converter__label"
            variant="outlined"
            label="From"
            value={ fromRoman ? 'Roman' : 'Arabic' }
            disabled
            helperText={ ' ' }
            data-testid="label"
          />
          <IconButton onClick={ onUpdateType } data-testid="swap-button">
            <SwapHorizIcon />
          </IconButton>
          <TextField
            className="numeral-converter__label"
            variant="outlined"
            label="To"
            value={ fromRoman ? 'Arabic' : 'Roman' }
            disabled
            helperText={ ' ' }
            data-testid="label"
          />
        </div>
      </div>

      {
        value !== '' && result !== '' && (
          <div className="numeral-converter__result" data-testid="result">
            <span>{ `${ value } =` }</span>
            <span>{ result }</span>
          </div>
        )
      }
    </div>
  );
}

export default NumeralConverter;

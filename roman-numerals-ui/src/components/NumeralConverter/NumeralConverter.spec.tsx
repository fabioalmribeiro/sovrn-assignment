import React from 'react';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';

import NumeralConverter from './NumeralConverter';
import numeralsAPI from '../../api/api';

jest.mock('src/api/api');
const mockedApi = numeralsAPI as jest.Mocked<typeof numeralsAPI>;

beforeEach(() => {
  render(<NumeralConverter />);
});

test('renders input elements', () => {
  const inputEl = screen.getByTestId('value-input');
  const labelEls = screen.getAllByTestId('label');
  const swapEl = screen.getByTestId('swap-button');
  const resultEl = screen.queryByTestId('result');

  expect(inputEl).toBeInTheDocument();
  expect(labelEls).toHaveLength(2);
  expect(swapEl).toBeInTheDocument();
  expect(resultEl).not.toBeInTheDocument();
});

test('renders result element', async () => {
  mockedApi.get.mockResolvedValue({
    status: 200,
    data: {
      results: {
        convertedValue: 10
      }
    }
  });

  const input = screen.getByTestId('value-input').querySelector('input');
  act(() => {
    fireEvent.change(input, { target: { value: 'x' } });
  });

  await waitFor(() => {
    expect(mockedApi.get).toHaveBeenCalledTimes(1);
  }, { timeout: 550 });

  const resultEl = screen.queryByTestId('result');
  expect(resultEl).toHaveTextContent(/10/i);
  expect(resultEl).toBeInTheDocument();
});

test('swap button changes from/to', () => {
  const swapEl = screen.getByTestId('swap-button');

  act(() => {
    fireEvent.click(swapEl);
  });

  const labelEls = screen.getAllByTestId('label');
  expect(labelEls[0].querySelector('input')).toHaveValue('Arabic');
});

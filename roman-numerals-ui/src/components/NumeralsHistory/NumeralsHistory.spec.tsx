import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';

import NumeralsHistory from './NumeralsHistory';
import numeralsAPI from '../../api/api';

jest.mock('src/api/api');
const mockedApi = numeralsAPI as jest.Mocked<typeof numeralsAPI>;

test('renders table & buttons', () => {
  render(<NumeralsHistory />);

  const tableEl = screen.getByTestId('table');
  const itemEls = screen.queryAllByTestId('item-row');
  const refreshEl = screen.getByTestId('refresh-btn');
  const deleteEl = screen.getByTestId('delete-btn');

  expect(tableEl).toBeInTheDocument();
  expect(itemEls).toHaveLength(0);
  expect(refreshEl).toBeInTheDocument();
  expect(deleteEl).toBeInTheDocument();
});

test('render 1 row on mount', async () => {
  mockedApi.get.mockResolvedValue({
    status: 200,
    data: {
      results: [{
        roman: 'X',
        arabic: 10
      }]
    }
  });

  act(() => {
    render(<NumeralsHistory />);
  });

  await waitFor(() => {
    expect(mockedApi.get).toHaveBeenCalledTimes(1);
  });

  const itemEls = await screen.findByTestId('item-row');
  const tds = itemEls.querySelectorAll('td');
  expect(tds[0]).toHaveTextContent('X');
  expect(tds[1]).toHaveTextContent(/10/i);
});

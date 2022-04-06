import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CachedIcon from '@material-ui/icons/Cached';
import _ from 'lodash';

import './NumeralsHistory.scss';
import Numeral from 'src/interfaces/Numeral';
import numeralsAPI from 'src/api/api';
import apiUrls from 'src/api/api-urls';

function NumeralsHistory() {
  const [rows, setRows] = useState<Numeral[]>([]);

  const onRefreshList = async () => {
    const response = await numeralsAPI.get(apiUrls.allNumerals);

    if (response.status === 200) {
      setRows(response.data.results);
    }
  };

  const onDeleteList = async () => {
    const response = await numeralsAPI.delete(apiUrls.removeAllNumerals);

    if (response.status === 200) {
      setRows([]);
    }
  };

  useEffect(() => {
    const getList = async () => {
      const response = await numeralsAPI.get(apiUrls.allNumerals);

      if (response && response.status === 200 && response.data.results) {
        setRows(response.data.results);
      }
    };

    getList();
  }, []);

  return (
    <div className="numerals-list">
      <Table className="numerals-list__table" data-testid="table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Roman</TableCell>
            <TableCell align="center">Arabic</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            _.map(rows, (row) => (
              <TableRow key={ row.roman } data-testid="item-row">
                <TableCell align="center">{ row.roman }</TableCell>
                <TableCell align="center">{ row.arabic }</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>

      <div className="numerals-list__actions">
        <IconButton title="Refresh List" onClick={ onRefreshList } data-testid="refresh-btn">
          <CachedIcon />
        </IconButton>
        <IconButton title="Clear List" onClick={ onDeleteList } data-testid="delete-btn">
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default NumeralsHistory;

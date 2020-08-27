import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import getValueForShow from 'helpers/valueToShow';

import * as S from './styled';

const getValueForRender = (value, colKey) => (colKey === 'value' ? getValueForShow(value) : value);

const TableBody = ({
  columns,
  rows,
  emptyRows,
  t,
}) => (
  <S.TableBody>
    {rows.map((row, index) => (
      <S.TableRow key={index}>
        {columns.map(({ propName }) => (
          <S.TableCell key={propName}>{getValueForRender(row[propName], propName)}</S.TableCell>
        ))}
      </S.TableRow>
    ))}
    {emptyRows > 0 && (
      <S.TableRow style={{ height: 49 * emptyRows }}>
        <S.TableCell
          align="center"
          colSpan={columns.length}
        >
          {rows.length ? null : t('common.no_data')}
        </S.TableCell>
      </S.TableRow>
    )}
  </S.TableBody>
);

TableBody.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  emptyRows: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(TableBody);

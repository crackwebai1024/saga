import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import getValueForShow from 'helpers/valueToShow';

import Score from 'components/Score';
import * as S from './styled';

const getValueForRender = (value, colKey) => ((colKey === 'value' && value != null) ? getValueForShow(value) : value);

const TableBody = ({
  columns,
  rows,
  emptyRows,
  colAlign,
  t,
}) => (
  <S.TableBody>
    {rows.map((row, index) => (
      <S.RowLink
        key={index}
        to={`/country/${row.countrySlug}/country-dashboard`}
        target="_blank"
      >
        {columns.map(([colKey], i) => (
          <S.TableCell key={colKey} align={colAlign[i]}>
            {colKey === 'status'
              ? <Score value={row[colKey]} display="inline-block" size={20} />
              : getValueForRender(row[colKey], colKey)}
          </S.TableCell>
        ))}
      </S.RowLink>
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
  colAlign: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  emptyRows: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(TableBody);

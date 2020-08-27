import React from 'react';
import PropTypes from 'prop-types';

import Header from 'modules/Admin/Countries/Table/Header';
import Body from 'modules/Admin/Countries/Table/Body';
import Pagination from 'modules/Admin/Countries/Table/Pagination';

import * as S from './styled';

const Content = (props) => {
  const {
    options,
    countries,
    allCount,
    rowsPerPage,
    page,
    order,
    orderBy,
    handleRequestSort,
    handleChangePage,
    handleChangeRowsPerPage,
    onEdit,
    onDelete,
  } = props;

  const emptyRows = options.minRowsPerPage - Math.min(options.minRowsPerPage, allCount - (page * rowsPerPage));

  return (
    <>
      <S.TableWrapper>
        <S.StyledTable aria-labelledby="tableTitle">
          <Header
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            displayedValues={options.displayedValues}
          />
          <Body
            rows={countries}
            emptyRows={emptyRows}
            displayedValues={options.displayedValues}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </S.StyledTable>
      </S.TableWrapper>
      <Pagination
        rowsPerPageOptions={options.rowsPerPageOptions}
        count={allCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

Content.propTypes = {
  options: PropTypes.object.isRequired,
  countries: PropTypes.array.isRequired,
  allCount: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  handleRequestSort: PropTypes.func.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Content;

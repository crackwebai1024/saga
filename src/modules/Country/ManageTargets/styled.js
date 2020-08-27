import styled from 'styled-components';
import { Paper, Table } from '@material-ui/core';

export const Root = styled.div`
  box-sizing: border-box;
  max-width: 1440px;
  margin: 20px auto 0;
  padding: 0 24px;
  width: 100%;
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
`;

export const StyledPaper = styled(Paper)`
  && {
    width: 100%;
    margin-bottom: 15px;
  }
`;

export const StyledTable = styled(Table).attrs((props) => ({
  'aria-labelledby': props['aria-labelledby'] || '',
}))`
  && {
    min-width: 750px;
  }
`;

import styled from 'styled-components';
import TableCell from '@material-ui/core/TableCell';

export const StyledTableCell = styled(TableCell).attrs((props) => ({
  align: props.align || 'inherit',
}))`
  && {
    color: ${({ color }) => color};
  }
`;

export const Cell = styled(TableCell).attrs(() => ({

}))`
  &.MuiTableCell-root {
    padding: 14px;
  }

  &:nth-child(1) {
    min-width: 140px;
  }

  &:nth-child(2) {
    min-width: 140px;
  }

  &:nth-child(3) {
    width: 50%;
  }

  &:nth-child(4) {
    width: 50%;
  }

  &:nth-child(5) {
    min-width: 140px;
  }

  &:nth-child(6) {
    min-width: 36px;
    padding: 6px 32px 6px 16px;
    width: 36px;
  }

  &:nth-child(7) {
    min-width: 56px;
    padding: 6px 32px 6px 16px;
    width: 56px;
  }
`;

export const StatusImage = styled.img`
  margin-right: 2px;
`;

export const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default StyledTableCell;

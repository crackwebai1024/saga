import styled from 'styled-components';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export const RightTableCell = styled(TableCell).attrs((props) => ({
  align: props.type === 'actions' ? 'center' : props.align,
}))`
  && {
    color: ${({ color }) => color};
  }

  ${(props) => props.type === 'isPrimary'
    && `
  width: 50px;    
  `}
  ${(props) => props.type === 'actions'
  && `
  width: 128px;
  `}
  ${(props) => props.type === 'value'
  && `
  width: 75px;
  `}
`;

export const StyledTableRow = styled(TableRow)`
  span {
    font-weight: bold;
  }
`;

import styled from 'styled-components';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export const Title = styled.div`
  flex-grow: 0;
`;

export const Spacer = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
`;

export const StyledToolbar = styled(Toolbar)`
  && {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const TableTitle = styled(Typography).attrs(() => ({
  variant: 'h4',
  id: 'tableTitle',
}))`
  && {
    font-size: 36px;
    font-weight: bold;
    letter-spacing: 0.19px;
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const AddButton = styled(Button).attrs(() => ({
}))`
  && {
    text-transform: none;

    && .MuiButton-label {
      line-height: 24px;
    }
  }
`;

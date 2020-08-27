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
  @media (min-width: 600px) {
    & {
      padding-left: 16px !important;
      padding-right: 16px !important;
      margin-bottom: 16px;
    }
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

export const StyledButton = styled(Button).attrs(() => ({
}))`
  && {
    color: white;
    background-color: ${({ theme }) => theme.colors.primaryDark};
    border-radius: 20px;
    width: 110px;
    line-height: 20px;
    padding-bottom: 4px;
    text-transform: none;

    &:hover {
      color: white;
      background-color: ${({ theme }) => theme.colors.primaryDark};
    }
  }
`;

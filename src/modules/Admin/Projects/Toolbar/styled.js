import styled from 'styled-components';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

export const StyledToolbar = styled(Toolbar)`
  && {
    padding-left: 0;
    padding-right: 0;
    justify-content: space-between;
  }
`;

export const StyledButton = styled(Button).attrs(() => ({
  variant: 'contained',
  size: 'small',
  color: 'primary',
}))`
  && {
    align-self: flex-end;
    margin-bottom: 8px;
    border-radius: 16px;
    padding-left: 18px;
    padding-right: 18px;
    text-transform: none;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.07px;
    color: #ffffff;
  }
`;

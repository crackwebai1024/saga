import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Box } from '@rebass/grid';

export const Div = styled.div`
  && {
    text-align: center;
    margin: 0;
    height: 28px;
    padding-top: 2px;
    font-weight: 300;
  }

  && > span {
    font-size: 16px;
    letter-spacing: 0.08px;
    text-align: center;
    margin: 0;
    color: ${({ theme }) => theme.colors.primaryWhite};
    line-height: 26px;
    height: 26px;

    &.bold {
      font-weight: 500;
    }
  }
`;

export const Row = styled.div`
  ${({ color }) => (color && `background-color: ${color};`)};
  ${({ mb }) => (mb && `margin-bottom: ${mb}px;`)};
  ${({ fullWidth }) => fullWidth && 'margin-left: -16px; margin-right: -16px;'};
`;

export const Text = styled(Box).attrs(() => ({

}))`
  font-size: 16px;
  font-weight: 400;

  && > span.bold {
    font-weight: bold;
  }
`;

export const Title = styled(Link).attrs(() => ({
}))`
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.09px;
  color: ${({ theme }) => theme.colors.primaryDark};
`;

export const Wrapper = styled(Box).attrs(() => ({

}))`
  && {
    padding: 16px;
  }
`;

export const ViewCountryButton = styled(Button).attrs((props) => ({
  ...props,
  variant: 'contained',
  component: Link,
  color: 'primary',
}))`
  && {
    padding-left: 16px;
    padding-right: 16px;
    height: 30px;
    line-height: 28px;
    text-align: center;
    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.primaryDarkBlue};
    border-color: ${({ theme }) => theme.colors.primaryDarkBlue};
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.07px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primaryWhite} !important;
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    text-transform: none;

    &.Mui-disabled {
      background-color: ${({ theme }) => theme.colors.primaryDarkBlue};
      opacity: 0.6;
    }
  }
`;

import styled from 'styled-components';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MaterialMenuItem from '@material-ui/core/MenuItem';
import Global from 'images/global.svg';
import { Link } from 'react-router-dom';
import { darken } from 'polished';

export const FormControlSelect = styled(FormControl)`
  && > div {
    display: flex;
    padding: 0;
    width: 270px;
    align-items: center;
    justify-content: space-between;
    background: transparent;

    svg {
      margin-left: 20px;
      color: ${({ theme }) => (theme.countryTheme.colors.fontMainColor)};
    }
  }

  ${(props) => props.global === 'true'
    && `
    && > div {
      svg {
        color:white;
      }
    }
  `}

  && > div::before,
  && > div::after {
    display: none;
  }
`;

export const MenuItem = styled(MaterialMenuItem).attrs(() => ({
  component: Link,
}))`
  margin-left: 0;
`;

export const SelectItem = styled(Select)`
  font-weight: 500;
  line-height: 1.5;
  max-width: 100%;
  margin-left: 2px;

  && > div {
    padding: 13px 25px 9px 5px;
    color: ${({ theme }) => (theme.countryTheme.colors.fontMainColor)};
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 0.08px;
    cursor: pointer;
  }

  ${(props) => props.global === 'true'
    && `
    && > div {
      color: white;
    }
  `}
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => (
    // eslint-disable-next-line max-len
    `background-color: ${theme.countryTheme.colors.buttonMainColor || darken(0.05, theme.countryTheme.colors.mainColor)};`
  )}
  padding-left: 14px;
  padding-right: 14px;
  border-radius: 5px;
`;

export const GlobalIcon = styled.img.attrs(() => ({
  src: Global,
}))`
  width: 26px;
  height: 26px;
  margin-right: 10px;
`;

export const GlobalIconContainer = styled.div`
  && {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 16px;
    margin-left: -5px;
  }
`;

export const classes = (theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
});

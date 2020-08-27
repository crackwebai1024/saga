import styled from 'styled-components';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import InputLabel from '@material-ui/core/InputLabel';

import { Box } from '@rebass/grid';

export const Container = styled(Box).attrs(() => ({

}))`

`;

export const Button = styled(ToggleButton).attrs(() => ({

}))`
  && {
    font-size: 18px;
    height: 38px;
    min-width: 150px;
    margin-bottom: 40px;
    text-transform: none;
  }

  &.MuiToggleButton-root.Mui-selected {
    background-color: ${({ theme }) => theme.colors.lightBlue};
    color: ${({ theme }) => theme.colors.primaryWhite};
  }

  &.MuiToggleButton-root.Mui-selected:hover {
    background-color: ${({ theme }) => theme.colors.toggleGray};
    color: ${({ theme }) => theme.colors.toggleTextGray};
  }
`;

export const ButtonGroup = styled(ToggleButtonGroup).attrs(() => ({

}))`

`;

export const Label = styled(InputLabel).attrs(() => ({

}))`
  &.MuiFormLabel-root {
    font-size: 12px;
  }
`;

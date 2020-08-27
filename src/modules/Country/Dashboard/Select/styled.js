import styled from 'styled-components';

import MuiSelect from '@material-ui/core/Select';
import MuiInput from '@material-ui/core/Input';
import MuiInputLabel from '@material-ui/core/InputLabel';
import MuiMenuItem from '@material-ui/core/MenuItem';

export const Select = styled(MuiSelect).attrs((props) => ({
  ...props,
}))`
  && {
    width: 340px;
    margin-bottom: 10px;

    @media print {
      svg {
        display: none;
      }
    }
  }
`;

export const Input = styled(MuiInput).attrs((props) => ({
  ...props,
}))`
  && {
    font-size: 0.875rem;
    line-height: 1.36;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.mainDark || '#000'};
  }
`;

export const InputLabel = styled(MuiInputLabel).attrs((props) => ({
  ...props,
}))`
  && {
    margin-top: 10px;
    font-size: 0.75rem;
    line-height: 1.33;
    color: ${({ theme }) => theme.colors.mainDark || '#000'};
  }
`;

export const MenuItem = styled(MuiMenuItem).attrs(({ value }) => ({
  value,
}))`
  && {
    font-size: 0.875rem;
    line-height: 1.36;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.mainDark || '#000'};
  }
`;

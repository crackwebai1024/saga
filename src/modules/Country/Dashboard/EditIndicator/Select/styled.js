import styled from 'styled-components';
import MuiSelect from '@material-ui/core/Select';
import MuiInput from '@material-ui/core/Input';
import MuiInputLabel from '@material-ui/core/InputLabel';
import MuiMenuItem from '@material-ui/core/MenuItem';

export const Wrapper = styled.div`
  width: 100%;
  padding-right: 35px;
`;

export const Select = styled(MuiSelect).attrs((props) => ({
  ...props,
}))`
  && {
    width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
    min-width: 204px;
    max-width: 100%;
  }
`;

export const Input = styled(MuiInput).attrs((props) => ({
  ...props,
}))`
  && {
    font-size: 0.875rem;
    line-height: 1.14;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primaryDark || '#000'};
    letter-spacing: 0.75px;
    text-transform: uppercase;
  }
`;

export const InputLabel = styled(MuiInputLabel).attrs((props) => ({
  ...props,
}))`
  && {
    font-size: 1rem;
    line-height: 1;
    color: #4a4a4a;
  }
`;

export const MenuItem = styled(MuiMenuItem).attrs(({ value }) => ({
  value,
}))`
  && {
    font-size: 0.875rem;
    line-height: 1.14;
    color: ${({ theme }) => theme.colors.primaryDark || '#000'};
    letter-spacing: 0.75px;
    text-transform: uppercase;
  }
`;

import styled from 'styled-components';
import MuiSelect from '@material-ui/core/Select';
import MuiInput from '@material-ui/core/Input';
import MuiInputLabel from '@material-ui/core/InputLabel';
import MuiMenuItem from '@material-ui/core/MenuItem';

export const Wrapper = styled.div`
  width: 100%;
`;

export const Select = styled(MuiSelect).attrs((props) => ({
  ...props,
}))`
  && {
    width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
    min-width: 87px;
    max-width: 100%;
    background-color: ${({ theme }) => theme.colors.filterBackground};
    padding-left: 8px;

    &::before {
      border-bottom: 1px solid;
      border-bottom-color: ${({ theme }) => theme.colors.filterBorder};
    }
  }

  .MuiSelect-icon {
    color: ${({ theme }) => theme.colors.primaryDark || '#000'};
  }
`;

export const Input = styled(MuiInput).attrs((props) => ({
  ...props,
}))`
  && {
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.08px;
    line-height: 1;
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const InputLabel = styled(MuiInputLabel).attrs((props) => ({
  ...props,
}))`
  && {
    font-size: 15px;
    letter-spacing: 0.08px;
    color: ${({ theme }) => theme.colors.primaryDark || '#000'};
    margin-bottom: 5px;
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

import styled from 'styled-components';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export const FormControlSelect = styled(FormControl)`
  height: ${({ small }) => (small === 'yes' ? '55px' : '90px')};
  width: 100%;
`;

export const StyledSelect = styled(Select)`
  svg {
    display: ${({ disabled }) => (disabled ? 'none' : 'inline-block')};
  }
`;

export const blank = {};

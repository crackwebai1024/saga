import styled from 'styled-components';

import MuiMaterialTextField from '@material-ui/core/TextField/TextField';
import MuiFormHelperText from '@material-ui/core/FormHelperText';

export const MaterialTextField = styled(MuiMaterialTextField)`
  .MuiInputBase-root::after {
    border-bottom: 2px solid #4a4a4a;
  }

  .MuiInputBase-multiline {
    padding: 10px 0;
    font-size: 14px;
    font-weight: 350;
    line-height: 140%;
    color: #4a4a4a;
  }

  .MuiInput-underline::before {
    display: none;
  }

  .Mui-disabled {
    color: rgba(74, 74, 74, 0.9);
  }
`;

export const FormHelperText = styled(MuiFormHelperText)`
  padding-bottom: 10px;
`;

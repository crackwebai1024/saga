import styled from 'styled-components';

import MuiFormHelperText from '@material-ui/core/FormHelperText';

export const Wrapper = styled.div`

`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export const FormHelperText = styled(MuiFormHelperText).attrs((props) => ({ ...props }))`
  && {
    margin-top: 0;
  }
`;

import styled from 'styled-components';
import MaterialTextField from '@material-ui/core/TextField/TextField';

export const TextField = styled(MaterialTextField).attrs((props) => ({
  ...props,
}))`
  height: 90px;
  width: 100%;

  input[type="color"] {
    cursor: pointer;
  }
`;

export const Blank = () => {};

import styled from 'styled-components';
import MaterialButton from '@material-ui/core/Button';

export const Button = styled(MaterialButton).attrs(() => ({
}))`
  && {
    text-transform: none;
  }
`;

export const blank = {};

import styled from 'styled-components';
import MuiIconButton from '@material-ui/core/IconButton';

export const Wrapper = styled.div`
  display: flex;
`;

export const IconButton = styled(MuiIconButton)`
  && {
    padding: 0;
    margin: 0 12px 0 0;
    border-radius: 0;
    background-color: transparent;
    opacity: ${({ isSelected }) => (isSelected ? 1 : 0.5)};
  }
`;

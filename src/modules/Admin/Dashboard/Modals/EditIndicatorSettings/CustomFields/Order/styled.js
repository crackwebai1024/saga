import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';

export const OrderContainer = styled.div`
  display: flex;
  width: 60px;
`;

export const StyledIconButton = styled(IconButton)`
  width: 25px;
  height: 25px;
  padding: 0 !important;
`;

export const noop = () => {};

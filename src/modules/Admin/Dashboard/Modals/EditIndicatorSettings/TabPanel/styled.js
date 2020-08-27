import styled from 'styled-components';
import Box from '@material-ui/core/Box';

export const Wrapper = styled(Box).attrs(() => ({
  p: 3,
}))`
  flex: 1;
`;

export const Content = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

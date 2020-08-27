import styled from 'styled-components';
import { Flex } from '@rebass/grid';

export const Container = styled(Flex).attrs(() => ({
  flex: '1 0 auto',
  flexDirection: 'column',
}))`
  min-height: 100%;
`;

export const Content = styled(Flex).attrs(() => ({
  flex: '1 0 auto',
  justifyContent: 'center',
  my: 56,
}))`
  min-height: 350px;
`;

export const Wrapper = styled(Flex).attrs(() => ({
  width: 1,
  flexDirection: 'column',
}))`
  height: 100%;
`;

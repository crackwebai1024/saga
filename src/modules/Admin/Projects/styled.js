import styled from 'styled-components';
import { Flex } from '@rebass/grid';

export const Content = styled(Flex).attrs(() => ({
  flex: '1 0 auto',
  flexDirection: 'column',
}))`
  min-height: 350px;
  max-width: ${({ theme }) => theme.layout.contentMaxWidth || null};
  padding: ${({ theme }) => theme.layout.contentPadding};
  width: 100%;
`;

export const noop = () => {};

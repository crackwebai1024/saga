import styled from 'styled-components';
import { Box, Flex } from '@rebass/grid';
import { Link as RouterLink } from 'react-router-dom';

export const Container = styled(Flex).attrs(() => ({
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}))`

`;

export const Content = styled(Box).attrs(() => ({

}))`

`;

export const Link = styled(RouterLink)`
  color: ${({ theme }) => theme.colors.primaryBlue};
  font-size: 14px;
  margin-bottom: 12px;
`;

export const Text = styled(Box).attrs(() => ({
  fontSize: 18,
  mb: 20,
}))`
  color: ${({ theme }) => theme.colors.primaryDark};
`;

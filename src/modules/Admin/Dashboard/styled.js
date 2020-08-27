import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import { Link as RouterLink } from 'react-router-dom';

export const Link = styled(RouterLink)`
  color: ${({ theme }) => theme.colors.primaryBlue};
  margin: 20px 0;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 150px;
`;

export const Content = styled(Flex).attrs(() => ({
  flex: '1 0 auto',
  flexDirection: 'column',
}))`
  min-height: 350px;
  max-width: ${({ theme }) => theme.layout.contentMaxWidth || null};
  padding: ${({ theme }) => theme.layout.contentPadding};
  width: 100%;
`;

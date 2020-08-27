import styled from 'styled-components';
import { Flex } from '@rebass/grid';

export const Container = styled(Flex).attrs(() => ({
  flex: '1 0 auto',
  flexDirection: 'column',
  alignItems: 'center',
}))`
  background: ${({ theme }) => theme.colors.appBackground};
  min-height: 100%;
`;

export const Content = styled(Flex).attrs(() => ({
  flex: '1 0 auto',
  justifyContent: 'center',
  my: 70,
}))`
  box-sizing: border-box;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.contentMaxWidth || null};
  padding: ${({ theme }) => theme.layout.contentPadding};

  @media print {
    margin-right: -15px;
    max-width: 1455px;
  }
`;

export const Wrapper = styled(Flex).attrs(() => ({
  width: 1,
  flexDirection: 'column',
}))`
  height: 100%;
`;

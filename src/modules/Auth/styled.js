import styled from 'styled-components';
import { Box, Flex } from '@rebass/grid';
import logo from 'images/logo-da.svg';

export const Container = styled(Flex).attrs(() => ({
  flex: '1 0 auto',
  flexDirection: 'column',
}))`
`;

export const Content = styled(Flex).attrs(() => ({
  flex: '1 0 auto',
  justifyContent: 'center',
  my: 56,
}))`
  min-height: 350px;
`;

export const Header = styled.div`
  height: 64px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.primaryDark};
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 430px) {
    padding: 5px;

    img {
      height: 100%;
      width: auto;
      max-width: 300px;
    }
  }
`;

export const HeaderContent = styled(Flex).attrs(() => ({
  alignItems: 'center',
  px: 24,
  width: 1,
}))`
  height: 100%;
  max-width: 1440px;
`;

export const Logo = styled(Box).attrs(() => ({
  alt: 'logo',
  as: 'img',
  src: logo,
}))`
  height: 36px;
  width: auto;
`;

export const Wrapper = styled(Flex).attrs(() => ({
  width: 1,
  flexDirection: 'column',
}))`
  overflow-x: hidden;
  height: '100%';
`;

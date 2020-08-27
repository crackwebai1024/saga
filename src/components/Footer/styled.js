import styled from 'styled-components';
import { Box, Flex } from '@rebass/grid';

import DALogo from 'images/logo-da.svg';

export const Container = styled(Flex).attrs(() => ({
  alignItems: 'space-beetw',
  flexDirection: 'row',
  justifyContent: 'space-between',
  mx: 'auto',
}))`
  bottom: 0;
  height: 133px;
  max-width: ${({ theme }) => theme.layout.contentMaxWidth || null};
  padding: ${({ theme }) => theme.layout.contentPadding};
  position: relative;

  @media print {
    height: 150px;
  }

  @media screen and (max-width: 430px) {
    padding: 0 12px;
  }
`;

export const TextContainer = styled(Flex).attrs(() => ({
  alignItems: 'flex-start',
  flexDirection: 'column',
  justifyContent: 'space-between',
  px: 24,
}))`
  bottom: 0;
  width: 530px;
  height: 100px;
  position: relative;

  @media screen and (max-width: 430px) {
    padding: 0 12px;
  }
`;

export const Wrapper = styled(Box).attrs(() => ({
  width: 1,
}))`
  background: ${({ theme }) => theme.colors.primaryDark};
  width: 100%;

  @media print {
    display: none;
  }
`;

export const TextPrimary = styled(Box).attrs(() => ({
  fontSize: 12,
  pt: 30,
}))`
  color: ${({ theme }) => theme.colors.footerGray};
`;

export const TextSecondary = styled(Box).attrs(() => ({
  fontSize: 12,
  pt: '4px',
}))`
  color: ${({ theme }) => theme.colors.primaryWhite};
`;

export const Logo = styled.img.attrs(() => ({
  src: DALogo,
}))`
  height: 48px;
  padding-top: 32px;
  padding-bottom: 16px;
`;

export const LinkContainer = styled.span`
  padding-left: 5px;
  margin-left: 5px;
  border-left: 1px solid currentColor;

  @media print {
    display: none;
  }
`;

export const StyledLink = styled.a`
  text-decoration: none;
  color: inherit;
  transition: color 0.2s ease-in-out;

  :hover {
    color: #ffffff;
  }

  @media print {
    display: none;
  }
`;

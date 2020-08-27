import styled from 'styled-components';
import { Box, Flex } from '@rebass/grid';

export const Container = styled(Flex).attrs(() => ({
  mx: 'auto',
  my: 0,
  px: '8px',
}))`
  margin: 0;
  flex-direction: column;

  @media screen and (min-width: 360px) {
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0 auto;
  }
`;

export const Item = styled(Flex).attrs(() => ({
  alignItems: 'center',
  mr: 40,
  mb: 12,
}))`
  display: flex;
`;

export const Label = styled.div`
  font-size: 12px;
`;

export const ColorDot = styled(Box).attrs(() => ({
  mr: '6px',
}))`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 100%;
  flex-shrink: 0;
  width: 12px;
  height: 12px;
`;

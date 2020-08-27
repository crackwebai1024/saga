import styled from 'styled-components';
import { Flex } from '@rebass/grid';

export const ItemWrapper = styled(Flex).attrs(({ isSubitem }) => ({
  alignItems: 'center',
  ml: isSubitem ? 24 : 0,
  mb: isSubitem ? 0 : 10,
  py: '4px',
  px: 10,
}))`
  background-color: ${({ isActive, theme }) => (isActive ? theme.colors.primaryDefault : 'transparent')};
  border-radius: 4px;
`;

export const Container = styled.div`

`;

export const Wrapper = styled.div`

`;

export const blank = {};

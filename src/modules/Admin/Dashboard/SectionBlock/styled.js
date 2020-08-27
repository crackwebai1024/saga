import styled from 'styled-components';
import { Flex } from '@rebass/grid';

export const Wrapper = styled.div`
  padding-top: 20px;
  padding-left: ${({ isDragging }) => (isDragging ? '20px' : '0')};
  margin-left: ${({ isDragging }) => (isDragging ? '-20px' : '0')};
  padding-bottom: ${({ isDragging }) => (isDragging ? '37px' : '47px')};
  border-bottom: ${({ isDragging }) => (isDragging ? 'none' : '1px solid rgba(0, 0, 0, 0.12)')};
  background-color: ${({ isDragging }) => (isDragging ? '#ffffff' : 'transparent')};
  box-shadow: ${({ isDragging }) => (isDragging ? '2px 2px 5px 0 rgba(100, 100, 100, 0.5)' : 'none')};
`;

export const Row = styled(Flex).attrs(() => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  width: '100%',
}))`
  margin: 0 -15px -30px;
`;

export const Item = styled.div`
  width: ${({ theme }) => theme.layout.indicatorCardSize};
  height: ${({ theme }) => theme.layout.indicatorCardSize};
  padding: 0 15px 30px;
  cursor: pointer;
`;

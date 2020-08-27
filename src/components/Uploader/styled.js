import styled from 'styled-components';
import { Flex } from '@rebass/grid';

export const DragContainer = styled(Flex).attrs({
  alignItems: 'center',
})`
  background-color: transparent;
  border-bottom: 1px solid gray;
  cursor: pointer;
  height: 55px;
`;

export const Text = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  white-space: nowrap;
`;

export const Container = styled(Flex)`
  flex-direction: column;
  height: 55px;
  max-width: 250px;
`;

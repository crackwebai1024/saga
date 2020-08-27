import styled from 'styled-components';
import { Flex } from '@rebass/grid';

import Typography from '@material-ui/core/Typography';

export const Wrapper = styled.div`
  padding-top: 20px;
  padding-bottom: 47px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
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

export const Title = styled(Typography).attrs(() => ({
  variant: 'h5',
  component: 'h2',
}))`
  && {
    line-height: 1.625;
    font-weight: bold;
    color: #4a4a4a;
  }
`;

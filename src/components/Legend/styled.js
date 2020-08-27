import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';

export const Wrapper = styled.div`
  width: 100%;
  padding-top: 10px;
`;

export const Title = styled(Typography).attrs(() => ({
  variant: 'subtitle1',
  component: 'div',
}))`
  && {
    margin-bottom: 5px;
    margin-right: 23px;
    line-height: 1.625;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  margin-right: 23px;
  margin-bottom: 5px;
`;

export const Desc = styled.div`
  margin-left: 8px;
  font-size: 0.875rem;
  line-height: 1;
  color: ${({ theme }) => theme.colors.primaryDark};
`;

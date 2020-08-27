import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';

export const BackLink = styled(RouterLink)`
  color: ${({ theme }) => theme.colors.primaryDark};
  margin-right: 10px;
  margin-top: 9px;
`;

export const TitleWrapper = styled.div`
  margin-right: auto;
`;

export const Title = styled(Typography).attrs(() => ({
  variant: 'h4',
  component: 'h1',
}))`
  && {
    color: ${({ color }) => color || '#4A4A4A'};
    font-weight: bold;
    line-height: 1.41;
  }
`;

export const Subtitle = styled(Typography).attrs(() => ({

}))`
  && {
    color: ${({ color }) => color || '#6C6C6C'};
    font-size: 1.125rem;
    line-height: 1.33;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.contentMaxWidth || null};
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
`;

export const SelectBox = styled.div`
  max-width: 12%;
`;

export const Calendar = styled.div`
  margin: 2rem 5px 0 5px;
  width: 165px;
`;

import styled from 'styled-components';

import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

export const Wrapper = styled.div`
  padding-top: 27px;
  padding-bottom: 47px;
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0 -15px -30px;

  @media print {
    margin-bottom: 0;
  }
`;

export const Item = styled.div`
  padding: 0 15px 30px;
`;

export const Title = styled(Typography).attrs(() => ({
  variant: 'h5',
  component: 'h2',
}))`
  && {
    margin-bottom: 10px;
    line-height: 1.625;
    font-weight: bold;
  }
`;

export const Link = styled(RouterLink)`
  text-decoration: none;
`;

import styled from 'styled-components';

import MuiArrowBack from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const ActionsArea = styled.div`
  margin: 0 20px 0  0;
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

export const ArrowBack = styled(MuiArrowBack)`

`;

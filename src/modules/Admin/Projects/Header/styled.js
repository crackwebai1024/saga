import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export const Wrapper = styled.div`
  width: 100%;
  padding-bottom: 28px;
`;

export const Title = styled(Typography).attrs(() => ({
  variant: 'h4',
  id: 'tableTitle',
}))`
  && {
    font-size: 36px;
    font-weight: bold;
    letter-spacing: 0.19px;
    color: ${({ theme }) => theme.colors.primaryDark};
    margin-bottom: 21px;
  }
`;

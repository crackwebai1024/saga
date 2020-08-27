import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export const Wrapper = styled.div`
  display: flex;
`;

export const Item = styled.span`
  font-size: 16px;
  line-height: 1.25;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.colors.primaryDarkBlue};
`;

export const Count = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primaryDarkBlue};
`;

export const Description = styled(Typography).attrs(() => ({
  variant: 'caption',
  component: 'p',
}))`
  && {
    font-size: 16px;
    line-height: 1.25;
    letter-spacing: 0.2px;
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Button from 'components/PrintButton';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const Title = styled(Typography).attrs(() => ({
  variant: 'h4',
  component: 'h1',
}))`
  && {
    font-size: 36px;
    font-weight: bold;
    letter-spacing: 0.19px;
    line-height: 1.3;
    color: ${({ theme }) => theme.colors.primaryDark || '#000'};
  }
`;

export const SubTitle = styled(Typography).attrs(() => ({
  variant: 'h6',
  component: 'h2',
}))`
  && {
    margin-top: 5px;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0.11px;
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const Description = styled(Typography).attrs(() => ({
  variant: 'caption',
  component: 'p',
}))`
  && {
    font-size: 16px;
    font-weight: 600;
    line-height: 1.38;
    letter-spacing: 0.2px;
    padding: 10px 10px 15px 0;
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const Counts = styled.div`
  padding: 17px 26px;
  border-radius: 5px;
  max-width: 732px;
  background-color: rgba(0, 56, 112, 0.04);
  padding-bottom: 31px;
  margin-bottom: 27px;
`;

export const StyledButton = styled(Button)`
  padding: 0;
  margin-top: 27px;
  margin-bottom: 30px;
`;

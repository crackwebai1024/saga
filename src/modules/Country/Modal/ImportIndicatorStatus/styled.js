import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';

export const Loader = styled.div`
  opacity: ${({ isLoading }) => (isLoading ? 1 : 0)};
`;

export const Link = styled(RouterLink)`
  text-decoration-line: underline;
  color: ${({ theme }) => theme.countryTheme.colors.mainColor};
  font-size: 12px;

  @media print {
    display: none;
  }

  :hover {
    text-decoration-line: none;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Modal = styled(Paper)`
  && {
    background-color: ${({ theme }) => theme.palette.background.paper};
    box-shadow: ${({ theme }) => theme.shadows[5]};
    left: 50%;
    outline: none;
    overflow-y: auto;
    padding: 25px;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    width: 500px;

    @media screen and (max-width: 600px) {
      width: 100%;
      height: 100%;
    }
  }
`;

export const Title = styled(Typography).attrs(() => ({
  variant: 'h5',
  component: 'h1',
}))`
  && {
    margin-bottom: 15px;
    font-weight: bold;
  }
`;

import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MuiFormHelperText from '@material-ui/core/FormHelperText';

export const Loader = styled.div`
  opacity: ${({ isLoading }) => (isLoading ? 1 : 0)};
`;

export const Modal = styled(Paper)`
  && {
    background-color: ${({ theme }) => theme.palette.background.paper};
    box-shadow: ${({ theme }) => theme.shadows[5]};
    left: 50%;
    outline: none;
    overflow-y: auto;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    width: 800px;

    @media screen and (max-width: 800px) {
      width: 600px;
    }

    @media screen and (max-width: 600px) {
      width: 100%;
    }
  }
`;

export const Title = styled(Typography).attrs(() => ({
  variant: 'h5',
  component: 'h1',
}))`
  && {
    display: flex;
    align-items: center;
    height: 56px;
    padding: 0 30px;
    background-color: #e5e5e5;
    font-size: 16px;
    font-weight: 500;
  }
`;

export const Content = styled.div`
  width: 100%;
  padding: 15px 0;
  box-sizing: border-box;
`;

export const FormHelperText = styled(MuiFormHelperText)`
  padding: 0 20px;
`;

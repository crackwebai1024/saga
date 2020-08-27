import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

export const Modal = styled(Paper)`
  && {
    background-color: ${({ theme }) => theme.palette.background.paper};
    box-shadow: ${({ theme }) => theme.shadows[5]};
    left: 50%;
    outline: none;
    overflow-y: auto;
    padding: 15px 25px;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    width: 800px;
    height: 780px;
    max-height: calc(90% - 50px);
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 600px) {
      width: 100%;
      height: 100%;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
`;

export const Title = styled.span`
  font-size: 24px;
  font-weight: bold;
  display: inline-block;
  margin-bottom: 20px;
`;

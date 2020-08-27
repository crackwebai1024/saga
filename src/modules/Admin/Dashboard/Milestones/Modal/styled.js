import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

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
    width: 974px;

    @media screen and (max-width: 600px) {
      width: 100%;
      height: 100%;
    }
  }
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  width: 100%;
  justify-content: space-between;
  display: flex;
`;

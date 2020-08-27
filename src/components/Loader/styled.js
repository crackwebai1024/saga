import styled from 'styled-components';
import MuiModal from '@material-ui/core/Modal';
import MuiCircularProgress from '@material-ui/core/CircularProgress';

export const Modal = styled(MuiModal)`
  && {
    > div:first-child {
      background: rgba(255, 255, 255, 0.7) !important;
    }

    div:focus {
      outline: none;
    }
  }
`;

export const Wrapper = styled.div`
  && {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const CircularProgress = styled(MuiCircularProgress)`
  && {
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

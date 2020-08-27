import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import { IconButton } from '@material-ui/core';
import MuiCircularProgress from '@material-ui/core/CircularProgress';

const standartSize = {
  width: 800,
  height: 600,
};

const fullScreenSize = {
  width: '100%',
  height: '100%',
};

export const StyledDialog = styled(Modal)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    outline: none;
  }
`;

export const Loader = styled.div`
  display: ${({ isLoading }) => (isLoading ? 'flex' : 'none')};
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
`;


export const ModalContent = styled.div`
  width: ${({ fullScreen }) => (fullScreen ? fullScreenSize.width : `${standartSize.width}px`)};
  height: ${({ fullScreen }) => (fullScreen ? fullScreenSize.height : `${standartSize.height}px`)};
  background-color: white;
  outline: none;
  border: none;
`;

export const Iframe = styled.iframe.attrs(({ fullScreen }) => ({
  ...(fullScreen ? fullScreenSize : standartSize),
}))`
  border: none;
`;

export const IframeContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const FullScreenButton = styled(IconButton)`
  && {
    position: absolute;
    right: 0;
    bottom: 0;
    color: white;
  }
`;

export const CircularProgress = styled(MuiCircularProgress)`
  && {
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';

import * as S from './styled';

const SRC_LINK = 'https://globalfishingwatch.org/map/workspace/udw-v2-aa0b72a9-36b2-438f-a5eb-d93faad278c7?embedded=true';

class GFWMapModal extends Component {
  state = {
    fullScreen: false,
    loading: true,
  }

  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
  }

  showHideFullScreen = () => this.setState((state) => ({ fullScreen: !state.fullScreen }));

  onLoadIframe = () => this.setState({ loading: false });

  onClose = () => {
    this.setState({ loading: true });
    this.props.closeModal();
  }

  render() {
    const {
      fullScreen,
      loading,
    } = this.state;

    const {
      isOpen,
    } = this.props;

    return (
      <S.StyledDialog
        open={isOpen}
        onClose={this.onClose}
      >
        <S.ModalContent fullScreen={fullScreen}>
          <S.IframeContainer>
            <S.Iframe
              title="map"
              allowFullScreen="true"
              onLoad={this.onLoadIframe}
              fullScreen={fullScreen}
              src={SRC_LINK}
            />
            <S.FullScreenButton
              onClick={this.showHideFullScreen}
            >
              {fullScreen ? <FullscreenExitIcon fontSize="large" /> : <FullscreenIcon fontSize="large" />}
            </S.FullScreenButton>
          </S.IframeContainer>
          <S.Loader isLoading={loading}>
            <S.CircularProgress />
          </S.Loader>
        </S.ModalContent>
      </S.StyledDialog>
    );
  }
}

export default GFWMapModal;

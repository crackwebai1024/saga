import React from 'react';
import styled from 'styled-components';
import { Drawer, List, IconButton } from '@material-ui/core';

export const StyledDrawer = styled((props) => (
  <Drawer {...props} classes={{ paper: 'paper' }} />
))`
  & .paper {
    width: 288px;
    padding: 0;
    top: 65px;
    height: calc(100% - 65px);
  }

  & .MuiDrawer-paperAnchorLeft {
    @media screen and (min-width: 1440px) {
      left: calc((100% - 1440px + 17px) / 2);
    }
  }

  & .MuiDrawer-paperAnchorRight {
    @media screen and (min-width: 1440px) {
      right: calc((100% - 1440px + 17px) / 2);
    }
  }

  && {
    & .MuiBackdrop-root {
      background-color: transparent;
    }
  }
`;

export const StyledUserDiv = styled.div`
  && {
    padding: 15px 17px 19px 17px;
    background-color: #f7f7f7;
    margin-bottom: 20px;
    position: relative;
  }
`;

export const StyledIconButton = styled(IconButton)`
  && {
    position: absolute;
    top: 6px;
    right: 4px;
  }
`;

export const StyledItem = styled.div`
  && {
    margin-top: 12px;
    margin-bottom: 12px;
    font-size: 14px;
    font-weight: normal;
    letter-spacing: 0.07px;
    color: ${({ theme }) => theme.colors.toggleTextGray};
  }
`;

export const StyledLink = styled.a`
  && {
    color: ${({ theme }) => theme.colors.toggleTextGray};
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.07px;
    text-decoration: none;
  }
`;

export const StyledList = styled(List)`
  && {
    width: 100%;
  }
`;

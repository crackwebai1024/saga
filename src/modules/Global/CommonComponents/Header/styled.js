import {
  AppBar, Toolbar, Typography, IconButton,
} from '@material-ui/core';
import styled from 'styled-components';

export const StyledAppBar = styled(AppBar)`
  && {
    background-color: ${({ theme }) => theme.colors.primaryDarkBlue};
    /* stylelint-disable */
    box-shadow: 0px 1px 4px -1px rgba(0,0,0,0.2), 0px 2px 5px 0px rgba(0,0,0,0.14), 0px 0.5px 10px 0px rgba(0,0,0,0.12);
    /* stylelint-enable */
    align-items: center;

    @media print {
      display: none;
    }
  }
`;

export const StyledLogo = styled.img`
  && {
    height: 36px;
    margin-right: 48px;
  }
`;

export const StyledIconButton = styled(IconButton)`
  && {
    margin-left: 15px;
  }
`;

export const StyledToolbar = styled(Toolbar)`
  && {
    box-sizing: border-box;
    width: 100%;
    justify-content: space-between;
    max-width: ${({ theme }) => theme.layout.contentMaxWidth || null};
    padding: ${({ theme }) => theme.layout.contentPadding};
  }
`;

export const LeftSideContent = styled.div`
  display: flex;
  align-items: center;
`;

export const RightSideContent = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

export const StyledTypography = styled(Typography)`
  && {
    color: #ffffff;
    flex-grow: 1;
  }
`;

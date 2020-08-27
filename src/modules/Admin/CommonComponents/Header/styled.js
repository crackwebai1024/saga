import styled from 'styled-components';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

export const StyledAppBar = styled(AppBar)`
  && {
    background-color: #27323e;
    align-items: center;
  }
`;

export const StyledToolbar = styled(Toolbar)`
  && {
    box-sizing: border-box;
    width: 100%;
    justify-content: space-between;
    height: 100%;
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
`;

export const StyledTypography = styled(Typography)`
  && {
    color: #ffffff;
    flex-grow: 1;
  }
`;

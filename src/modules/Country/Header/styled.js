import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledAppBar = styled(AppBar)`
  && {
    background-color: ${({ theme }) => theme.countryTheme.colors.mainColor};
    color: ${({ theme }) => theme.countryTheme.colors.fontMainColor};
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
  padding-right: 10px;
`;

export const RightSideContent = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

export const StyledTypography = styled(Typography)`
  && {
    color: ${({ theme }) => theme.countryTheme.colors.fontMainColor};
    flex-grow: 1;
  }
`;

export const SLinkContainer = styled.div`
  padding: 0 1rem;
  display: flex;
`;

export const SLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.countryTheme.colors.fontMainColor};
  display: flex;
  align-items: center;
  margin: 0 20px;
`;

export const SText = styled.span`
  margin-left: 6px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.countryTheme.colors.fontMainColor};
  line-height: 1.5;
`;

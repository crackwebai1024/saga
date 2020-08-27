import styled from 'styled-components';

import MuiDeleteIcon from '@material-ui/icons/Delete';
import MuiEditIcon from '@material-ui/icons/Edit';
import MuiSettingsIcon from '@material-ui/icons/Settings';
import MuiCard from '@material-ui/core/Card';
import MuiCardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

export const Card = styled(MuiCard).attrs(() => ({

}))`
  && {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export const Header = styled(Typography).attrs(() => ({
  variant: 'h6',
  component: 'h3',
}))`
  && {
    display: flex;
    align-items: center;
    height: 54px;
    padding: 0 15px;
    font-size: 0.875rem;
    line-height: 1.3;
    font-weight: bold;
    background-color: ${({ theme }) => theme.colors.primaryDark};
    color: #ffffff;
  }
`;

export const CardActions = styled(MuiCardActions)`
  && {
    position: relative;
    padding: 15px;
    margin: auto;
    justify-content: center;
  }
`;

export const DeleteIcon = styled(MuiDeleteIcon)`
  && {
    font-size: ${({ theme }) => theme.typography.indicatorIconFontSize};
  }
`;

export const EditIcon = styled(MuiEditIcon)`
  && {
    font-size: ${({ theme }) => theme.typography.indicatorIconFontSize};
  }
`;

export const SettingsIcon = styled(MuiSettingsIcon)`
  && {
    font-size: ${({ theme }) => theme.typography.indicatorIconFontSize};
  }
`;

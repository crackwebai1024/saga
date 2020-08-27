import styled from 'styled-components';
import MuiDeleteIcon from '@material-ui/icons/Delete';
import MuiEditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const ActionsArea = styled.div`
  margin: 0 0 0 auto;
`;

export const Link = styled(RouterLink)`
  margin: 0 0 0 20px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primaryBlue};
`;

export const Title = styled(Typography).attrs(() => ({
  variant: 'h5',
  component: 'h2',
}))`
  && {
    line-height: 1.625;
    font-weight: bold;
    color: #4a4a4a;
  }
`;

export const DeleteIcon = styled(MuiDeleteIcon)``;

export const EditIcon = styled(MuiEditIcon)``;

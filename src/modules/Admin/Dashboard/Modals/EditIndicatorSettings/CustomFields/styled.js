import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import MuiListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const Title = styled(Typography).attrs(() => ({
  variant: 'h5',
  component: 'h3',
  gutterBottom: false,
}))`
  && {
    line-height: 1.625;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const StyledList = styled(List)`
  width: 100%;
`;

export const ListItem = styled(MuiListItem)`
  && {
    padding: 8px 0;
    display: block;
    border-bottom: ${({ theme }) => `1px solid ${theme.colors.borderGray}`};

    &:last-child {
      border-bottom-color: transparent;
    }
  }
`;

export const AddListItem = styled(MuiListItem)`
  && {
    display: none;
    padding-left: 0;
    justify-content: space-between;
    align-items: center;
    ${(props) => props.isAddOpened === true
    && `
      display: flex;
    `}
  }
`;

export const CustomField = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const EditItem = styled.div`
  display: none;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.lightGray};
  padding-top: 8px;
  margin-bottom: -8px;
  ${(props) => (props.isEditOpened === true && props.name === props.current)
  && `
    display: flex;
  `}
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

export const AddButton = styled(Button)`
  :first-child {
    background-color: white;
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const ItemButtons = styled.div`
`;

export const StyledTextField = styled(TextField)`
  margin-bottom: 16px !important;
  margin-left: 60px !important;
`;

export const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  justify-content: space-between;
`;

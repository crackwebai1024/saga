import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import MuiListItem from '@material-ui/core/ListItem';
import MuiList from '@material-ui/core/List';
import Button from '@material-ui/core/Button';

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

export const List = styled(MuiList)`
  width: 100%;
  flex: 1;
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

export const AddColorContainer = styled.div`
  && {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const CurrentValues = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const EditItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.lightGray};
  padding-top: 8px;
  margin-bottom: -8px;
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

export const FieldsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  margin-right: 15px;
`;

export const TitleCell = styled.div`
  max-width: 47%;
  flex-basis: 47%;
  margin-right: 3%;
`;

export const ColorCell = styled.div`
  max-width: 47%;
  flex-basis: 47%;
  margin-left: 3%;
`;

export const ColorView = styled.div`
  padding: 15px 0;
  background-color: ${({ color }) => color};
`;

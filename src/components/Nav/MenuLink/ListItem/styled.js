import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { Flex } from '@rebass/grid';

const LinkListItem = styled(Flex).attrs(() => ({
  as: Link,
  m: 0,
}))`

`;

export const StyledListItem = styled(ListItem).attrs({
  as: LinkListItem,
})`
  font-size: 16px;
  text-decoration: none;
  color: ${({ isActive, theme }) => (isActive ? '#ffffff' : theme.colors.primaryDarkBlue)};
  margin: 0;

  && {
    max-width: 304px;
    width: 100%;
  }
`;

export const StyledListItemText = styled(ListItemText).attrs({

})`

`;

export const noop = () => {};

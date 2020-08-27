import styled from 'styled-components';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { Flex } from '@rebass/grid';

const CollapsableListItem = styled(Flex).attrs(() => ({
  alignItems: 'center',
  jusifyContent: 'space-between',
}))`
  cursor: pointer;
`;

export const StyledListItem = styled(ListItem).attrs({
  as: CollapsableListItem,
})`
  font-size: 16px;
  text-decoration: none;
  color: ${({ isActive }) => (isActive ? '#ffffff' : '#4A4A4A')};
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

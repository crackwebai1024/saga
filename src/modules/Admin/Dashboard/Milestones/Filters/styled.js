import styled from 'styled-components';

import { Flex } from '@rebass/grid';
import { DatePicker } from '@material-ui/pickers';
import { MenuItem } from '@material-ui/core';
import Select from '@material-ui/core/Select';

export const Content = styled(Flex).attrs(() => ({
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  width: 1,
}))`

`;

export const Row = styled(Flex).attrs(() => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  width: 1,
}))`
  margin-bottom: 30px;
`;

export const IndicatorSelect = styled(Select).attrs(() => ({
}))`
  width: 780px;
`;

export const PartySelect = styled(Select).attrs(() => ({
}))`
  margin-right: 20px;
  width: 340px;
`;

export const IndicatorGroupsItem = styled.div`
  padding-left: 10px;
  height: 30px;
  display: flex;
  align-items: center;
  font-weight: 600;
`;

export const StyledPicker = styled(DatePicker).attrs(() => ({
}))`
  && {
    width: 200px;
    margin-right: 20px;
  }
`;

export const Column = styled(Flex)`
  flex-direction: column;
`;

export const CheckboxGroup = styled.div`
  && {
    > span {
      color: transparent;
      padding: 4px;
      border-radius: 0;
      margin: 0 6px;
      opacity: 0.4;

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }
    }

    .checkedStatus {
      opacity: 1;
    }
  }
`;

export const Label = styled.span`
  && {
    color: rgba(0, 0, 0, 0.54);
    font-size: 12px;
  }
`;

export const PartyItem = styled(MenuItem)`
  max-width: 350px;
`;

export const CheckboxBlock = styled.div`
  && {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    justify-content: space-between;
  }
`;

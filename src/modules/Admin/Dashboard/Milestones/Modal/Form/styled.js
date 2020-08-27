import styled from 'styled-components';

import { Flex } from '@rebass/grid';
import { DatePicker } from '@material-ui/pickers';

export const FormContentContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;

  div {
    margin-right: 20px;
  }

  div:last-child {
    margin-right: 0;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`;

export const Label = styled.span`
  && {
    color: rgba(0, 0, 0, 0.54);
    font-size: 12px;
  }
`;

export const Column = styled(Flex)`
  flex-direction: column;
  width: 100%;
`;

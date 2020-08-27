import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import MuiDialogActions from '@material-ui/core/DialogActions';

export const FormContentContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid #e5e5e5;
  padding: 0 30px;
`;

export const DialogActions = styled(MuiDialogActions)`
  justify-content: flex-end;
  margin: 0 20px;
`;

export const Label = styled.span`
  && {
    color: #4a4a4a;
    font-size: 14px;
  }
`;

export const Column = styled(Flex)`
  flex-direction: column;
  width: 100%;
`;

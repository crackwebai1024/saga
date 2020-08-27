import styled from 'styled-components';
import DialogActions from '@material-ui/core/DialogActions';

export const FormContentContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > div:first-child {
    margin-right: 20px;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export const StyledDialogActions = styled(DialogActions)`
  justify-content: space-between !important;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Label = styled.span`
  && {
    color: #4a4a4a;
    font-size: 14px;
  }
`;

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

export const LeftSideContent = styled.div`
  display: flex;
  align-items: center;
`;

export const RightSideContent = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledDialogActions = styled(DialogActions)`
  justify-content: space-between !important;
`;

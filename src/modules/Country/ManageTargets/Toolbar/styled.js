import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Toolbar from '@material-ui/core/Toolbar';

export const Spacer = styled.div`
  flex-grow: 7;
  flex-shrink: 1;
`;

export const Title = styled.div`
  flex-grow: 0;
  padding-left: 16px;
  padding-top: 14px;
`;

export const SpacerSmall = styled.div`
  flex-grow: 1;
  flex-shrink: 7;
`;

export const AddButton = styled(Button)`
  :first-child {
    background-color: white;
    color: ${({ theme }) => theme.countryTheme.colors.mainColor};
  }
`;

export const FormControlSelect = styled(FormControl)`
  width: 200px;
`;

export const StyledToolbar = styled(Toolbar)`
  padding: 16px !important;
`;

import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';

export const FabWrapper = styled.div`
  padding: 0 15px;

  @media print {
    display: none;
  }
`;

export const StyledFab = styled(Fab)`
  && {
    width: 26px !important;
    height: 22px !important;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

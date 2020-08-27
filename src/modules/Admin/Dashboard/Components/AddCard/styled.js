import styled from 'styled-components';

import MuiCard from '@material-ui/core/Card';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiAddIcon from '@material-ui/icons/Add';

export const Card = styled(MuiCard)`
  && {
    width: 100%;
    height: 100%;
  }
`;

export const IconButton = styled(MuiIconButton)`
  && {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

export const AddIcon = styled(MuiAddIcon)`
  && {
    font-size: 58px;
  }
`;

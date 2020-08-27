import styled from 'styled-components';

import MuiIconButton from '@material-ui/core/IconButton';
import MuiPublishIcon from '@material-ui/icons/ExitToApp';
import MuiEditIcon from '@material-ui/icons/Edit';
import MuiTooltip from '@material-ui/core/Tooltip';

const width = 54;

export const IconButton = styled(MuiIconButton).attrs(({ props }) => ({
  ...props,
}))`
  && {
    width: ${width}px;
    height: 100%;
    padding: 0;
    border-radius: 0;
  }
`;
export const Tooltip = styled(MuiTooltip).attrs(({ props }) => ({
  ...props,
  placement: 'top',
}))`
  && {
    @media print {
      display: none;
    }
  }
`;

export const PublishIcon = styled(MuiPublishIcon).attrs(({ props }) => ({
  ...props,
}))`
  && {
    color: rgba(38, 50, 62, 0.6);
    transform: rotate(180deg);
  }
`;

export const EditIcon = styled(MuiEditIcon).attrs(({ props }) => ({
  ...props,
}))`
  && {
    color: rgba(38, 50, 62, 0.6);
  }
`;

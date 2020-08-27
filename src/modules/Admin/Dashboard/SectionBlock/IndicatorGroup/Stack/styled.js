import styled from 'styled-components';

import MuiCard from '@material-ui/core/Card';

export const StackWrapper = styled.div`
  position: relative;
  transform: translate(0, 0);
  height: 100%;
`;

export const Stack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: -1;
`;

/* eslint-disable indent */
export const StackItem = styled(MuiCard)`
  && {
    box-sizing: border-box;
    position: absolute;
    left: 4px;
    top: 4px;
    width: 100%;
    height: 100%;
    border-top-width: 54px;
    border-top-style: solid;
    border-top-color: #ffffff;
    z-index: -1;
  }

  & + & {
    left: 8px;
    top: 8px;
    z-index: -2;

    .isIndicatorsGroupDragging & {
      box-shadow:
        0 10px 20px -1px rgba(0, 0, 0, 0.2),
        0 20px 25px 0 rgba(0, 0, 0, 0.14),
        0 5px 50px 0 rgba(0, 0, 0, 0.12);
      pointer-events: auto !important;
    }
  }
`;
/* eslint-enable indent */

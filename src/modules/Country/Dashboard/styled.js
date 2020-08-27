import styled from 'styled-components';

import Button from '@material-ui/core/Button';

export const Root = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Legend = styled.div`
  /* margin-top: auto; */
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const GFWButton = styled(Button)`
  && {
    @media print {
      display: none;
    }
  }
`;

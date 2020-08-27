import styled from 'styled-components';

import SaveAltIcon from '@material-ui/icons/SaveAlt';

export const Container = styled.div`
  align-items: center;
  display: flex;
  overflow: ${({ drawer }) => (drawer === 'true' ? 'hidden' : 'auto')};
`;

export const Logout = styled(SaveAltIcon)`
  transform: rotate(-90deg);
`;

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
`;

export const CurrentDate = styled.div`
  display: none;
  height: 40px;
  width: calc(100% - 20px);
  position: fixed;
  top: 20px;
  right: 125px;
  z-index: 10000;
  justify-content: flex-end;
  color: black;

  @media print {
    display: flex;
  }
`;

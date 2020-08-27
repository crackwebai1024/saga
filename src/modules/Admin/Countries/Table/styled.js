import styled from 'styled-components';
import { Paper } from '@material-ui/core';

export const Root = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.contentMaxWidth || null};
  padding: ${({ theme }) => theme.layout.contentPadding};
  margin: auto ${({ theme }) => (theme.isInternetExplorer ? '0' : '20px')};
`;

export const StyledPaper = styled(Paper)`
  && {
    width: 100%;
    margin-bottom: 15px;
    margin-top: 25px;
    border-radius: 5px;
    box-shadow: 0 3px 8px 2px #00000005, 0 2px 4px 0 #00000034;
    background-color: #ffffff;
  }
`;

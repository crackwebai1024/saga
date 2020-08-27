import styled from 'styled-components';
import { Box, Flex } from '@rebass/grid';
import { Link as RouterLink } from 'react-router-dom';

import Button from '@material-ui/core/Button';

export const Actions = styled(Flex)`

`;

export const FormContentContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

export const ErrorMessage = styled(Box).attrs(() => ({
  fontSize: [14, 15, 16],
  mb: 10,
  mt: '5px',
}))`
  color: ${({ theme }) => theme.colors.error};
`;

export const Link = styled(RouterLink)`
  color: ${({ theme }) => theme.colors.primaryBlue};
  font-size: 14px;
  line-height: 36px;
`;

export const SmallButton = styled(Button)`
  && {
    font-size: 14px;
    margin-left: auto;
  }
`;

import styled from 'styled-components';
import { Box } from '@rebass/grid';

import Button from '@material-ui/core/Button';

export const FormContentContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  width: 300px;
`;

export const ErrorMessage = styled(Box).attrs(() => ({
  fontSize: [14, 15, 16],
  mb: 10,
  mt: '5px',
}))`
  color: ${({ theme }) => theme.colors.error};
`;

export const SmallButton = styled(Button)`
  width: 30%;
  font-size: 14px;
`;

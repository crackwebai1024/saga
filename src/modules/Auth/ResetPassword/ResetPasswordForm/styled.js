import React from 'react';
import styled from 'styled-components';
import { Box } from '@rebass/grid';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import CheckboxField from 'components/CheckboxField';

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

export const CheckboxContainer = styled.div`
  display: flex;
  margin-left: 5px;
`;

export const Label = styled(Box).attrs({
  fontSize: [12, 13, 14],
  mb: '6px',
  mt: '6px',
  width: 1,
})`
  font-weight: 500;
`;

export const StyledLink = styled(Link).attrs({
  fontSize: [12, 13, 14],
  mb: '6px',
  mt: '6px',
})`
  text-decoration: none;
  font-weight: 500;
`;

export const Checkbox = styled((props) => <CheckboxField {...props} />)`
  && {
    align-self: baseline;
    margin-right: 0;
    max-width: 180px;

    @media screen and (max-width: 400px) {
      max-width: 150px;
    }
  }
`;

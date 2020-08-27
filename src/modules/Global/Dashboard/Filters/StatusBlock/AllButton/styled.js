import styled from 'styled-components';

import MuiButton from '@material-ui/core/Button';

export const Button = styled(MuiButton)`
  && {
    min-width: 0;
    padding: 5px;
    border-radius: 0;
    font-size: 15px;
    line-height: 1;
    font-weight: 600;
    letter-spacing: 0.08px;
    color: ${({ theme }) => theme.colors.primaryDark};
    border-bottom: 1px solid;
    border-bottom-color: ${({ theme }) => theme.colors.filterBorder};
    text-transform: none;
    background-color: ${({ theme }) => theme.colors.filterBackground};
  }
`;

export const blank = () => {};

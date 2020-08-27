import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export const FormContentContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div:first-child {
    margin-right: 20px;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export const Half = styled.div`
  width: 50%;
`;

export const FormBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const RowCol = styled.div`
  max-width: 45%;
  flex: 1 0 50%;
  margin-bottom: ${({ hasCheckbox }) => (hasCheckbox ? '17px' : 0)};
`;

export const Title = styled(Typography).attrs(() => ({
  variant: 'h5',
  component: 'h3',
}))`
  && {
    margin-bottom: 10px;
    line-height: 1.625;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const ItemButtons = styled.div`
`;

export const StyledTextField = styled(TextField)`
  margin-bottom: 16px !important;
  margin-left: 60px !important;
`;

import styled from 'styled-components';

export const FormContentContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  div:first-child:not(.MuiFormControl-root) {
    margin-right: 20px;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

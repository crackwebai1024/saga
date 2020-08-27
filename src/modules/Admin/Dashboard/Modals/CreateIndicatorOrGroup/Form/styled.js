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

  div:first-child {
    margin-right: 20px;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export const RowRadio = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    margin-right: 100px;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export const HideRow = styled.div`
  display: none;
`;

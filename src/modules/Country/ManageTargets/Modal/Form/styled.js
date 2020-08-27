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
  justify-content: space-between;

  div:first-child {
    margin-right: 20px;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;
